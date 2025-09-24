const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
// Support both CJS and ESM builds of openid-client
let _openid;
try {
    _openid = require('openid-client');
} catch (e) {
    console.error('OIDC init failed: openid-client module not found. Did you run "npm i openid-client" in backend?');
}
let openidVersion = 'unknown';
try {
    openidVersion = require('openid-client/package.json').version;
} catch {}
const Issuer = _openid && (_openid.Issuer || (_openid.default && _openid.default.Issuer));
const generators = _openid && (_openid.generators || (_openid.default && _openid.default.generators));
const User = require("../models/userModel");
const Client = require("../models/clientModel")

const decideDashboard=(role)=>{
    if(role.userPermissions.Read) return 'admin'
    if(role.vehiclePermissions.Read) return 'vehicle'
    if(role.vehicleMaintenencePermissions.Read) return 'Mdashboard'
    if(role.hirePermissions.Read) return 'hires'
    if(role.contractPermissions.Read) return 'Contract/Dashbored'
    if(role.emergencyPermissions.Read) return 'emergency'
    if(role.financePermissions.Read) return 'finance/financeDashboard'
}

const login = async (req,res)=>{

    try{
        const {email,password}=req.body
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input' });
        }
        const safeEmail = email.trim().toLowerCase();
        if(!safeEmail||!password) return res.status(400).json({message:'All felds must be filled'})
        
        const user = await User.findOne({ email: safeEmail }).populate('role').exec();
  
        if(!user) return res.status(401).json({message:'No such User'})
        if(user.status=='inactive') return res.status(401).json({message:`Account is ${user.status}`})

        const match = await bcrypt.compare(password,user.password)
        if(!match) return res.status(401).json({message:'Unauthorized'})

        const path = decideDashboard(user.role)

        const accessToken = jwt.sign(
            {
                UserInfo:{
                    "id":user._id,
                    "name":user.firstName,
                    "email":user.email,
                    "role":user.role,
                    "path":path
                }
            },
            process.env.SECRET,
            {expiresIn:'1d'}
        )

        const refreshToken = jwt.sign(
            {"id":user._id,
            "email":user.email},
            process.env.REFRESH_SECRET,
            {expiresIn:'10d'}
        )
        const permissions = user.role
        await user.updateOne({refreshToken:refreshToken}).exec();
        return res.status(200).json({accessToken,permissions,email: safeEmail})
    }catch(error){
        return res.status(401).json({message:'Unauthorized'})
    }
}

const clientLogin = async (req,res)=>{
    try{
        const {email,password}=req.body
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input' });
        }
        const safeEmail = email.trim().toLowerCase();
        if(!safeEmail||!password) return res.status(400).json({message:'All felds must be filled'})
        const user =await Client.findOne({email: safeEmail}).exec()

        if(!user) return res.status(401).json({message:'No such User'})
        if(user.status=='inactive') return res.status(401).json({message:`Account is ${user.status}`})

        const match = await bcrypt.compare(password,user.password)
        if(!match) return res.status(401).json({message:'Unauthorized'})

        const accessToken = jwt.sign(
            {
                UserInfo:{
                    "id":user._id,
                    "name":user.firstName,
                    "email":user.email,
                    
                    
                }
            },
            process.env.SECRET,
            {expiresIn:'1d'}
        )

        const refreshToken = jwt.sign(
            {"email":user.email},
            process.env.REFRESH_SECRET,
            {expiresIn:'10d'}
        )
        
        return res.status(200).json({id:user._id,accessToken,refreshToken,email: safeEmail})
    }catch(error){
        return res.status(401).json({message:'Unauthorized'})
    }
}


const refresh = (req,res) =>{
    const cookie = req.cookies;
    console.log(cookie)
    if(!cookie.jwt) return res.status(401).json({message:'Unauthorized'})

    const refreshToken = cookie.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        async(err,decoded)=>{
            if(err) return res.status(403).json({message:'Forbidden'})
            const user = await User.findOne({'email':decoded.email}).exec()
            if(!user) res.status(401).json({message:'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    UserInfo:{
                        "id":user._id,
                        "name":user.firstName,
                        "email":user.email,
                        "role":user.role
                    }
                },
                process.env.SECRET,
                {expiresIn:'10s'}
            )

            res.json({accessToken})

        }

    ) 

}

const logout = (req,res) =>{
    const cookie = req.cookies
    if(!cookie.jwt) return res.sendStatus(204)
    res.clearCookie('jwt',{httpOnly:true,sameSite:None,secure:true})
    res.json({message:'cookie cleared'})

}



let discoveredIssuer; 
const getGoogleClient = async () => {
    if (!Issuer || !generators) {
        console.error('OIDC init failed: Issuer/generators unavailable. openid-client version =', openidVersion, 'module keys =', _openid && Object.keys(_openid));
        throw new Error('openid-client not loaded correctly');
    }
    if (!discoveredIssuer) {
        discoveredIssuer = await Issuer.discover('https://accounts.google.com');
    }
    return new discoveredIssuer.Client({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
        response_types: ['code']
    });
};

const googleAuthStart = async (req, res) => {
    try {
        const missing = [];
        if (!process.env.GOOGLE_CLIENT_ID) missing.push('GOOGLE_CLIENT_ID');
        if (!process.env.GOOGLE_CLIENT_SECRET) missing.push('GOOGLE_CLIENT_SECRET');
        if (!process.env.GOOGLE_REDIRECT_URI) missing.push('GOOGLE_REDIRECT_URI');
        if (missing.length) {
            console.error('OIDC init failed: missing env vars ->', missing.join(', '));
            return res.status(500).json({ message: `OIDC init failed: missing ${missing.join(', ')}` });
        }
        const client = await getGoogleClient();
        const state = generators.state();
        const nonce = generators.nonce();
        res.cookie('oidc_state', state, { httpOnly: true, sameSite: 'lax' });
        res.cookie('oidc_nonce', nonce, { httpOnly: true, sameSite: 'lax' });
        const authUrl = client.authorizationUrl({
            scope: 'openid email profile',
            prompt: 'consent',
            state,
            nonce
        });
        return res.redirect(authUrl);
    } catch (err) {
        console.error('OIDC init failed:', err && (err.stack || err.message || err));
        return res.status(500).json({ message: 'OIDC init failed' });
    }
};

const googleAuthCallback = async (req, res) => {
    try {
        const client = await getGoogleClient();
        const params = client.callbackParams(req);
        const stateCookie = req.cookies.oidc_state;
        const nonceCookie = req.cookies.oidc_nonce;
        const tokenSet = await client.callback(process.env.GOOGLE_REDIRECT_URI, params, { state: stateCookie, nonce: nonceCookie });
        const claims = tokenSet.claims();
        const email = claims.email;

        let user = await User.findOne({ email }).populate('role').exec();
        if (!user) {
            const Role = require('../models/roleModel');
            let defaultRole = await Role.findOne({ name: 'User' }).exec();
            if (!defaultRole) defaultRole = await Role.findOne({ isSystemRole: true }).exec();
            if (!defaultRole) defaultRole = await Role.findOne({}).exec();
            if (!defaultRole) {
                return res.status(500).json({ message: 'No roles defined. Create at least one role to auto-provision users.' });
            }

            const fullName = claims.name || '';
            const [firstName = 'Google', lastName = 'User'] = fullName.split(' ').length > 1
                ? [fullName.split(' ').slice(0, -1).join(' '), fullName.split(' ').slice(-1).join(' ')]
                : [fullName || 'Google', 'User'];
            const randomPassword = crypto.randomBytes(24).toString('hex');
            const hashed = await bcrypt.hash(randomPassword, 10);
            user = await User.create({
                firstName,
                lastName,
                middleName: '',
                gender: 'other',
                dob: new Date('1970-01-01'),
                phoneNumber: 'N/A',
                nicNumber: `AUTO-${crypto.randomBytes(6).toString('hex')}`,
                nicDocument: '',
                emergencyContacts: [],
                email,
                password: hashed,
                status: 'active',
                role: defaultRole._id,
                department: '',
                jobTitle: '',
                employmentDate: new Date(),
                baseSalary: 0,
                licenceNumber: '',
                empPhoto: ''
            });
            user = await User.findById(user._id).populate('role').exec();
        }
        if (user.status === 'inactive') {
            return res.status(401).json({ message: `Account is ${user.status}` });
        }

        const path = decideDashboard(user.role);
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: user._id,
                    name: user.firstName,
                    email: user.email,
                    role: user.role,
                    path
                }
            },
            process.env.SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.REFRESH_SECRET,
            { expiresIn: '10d' }
        );
        await user.updateOne({ refreshToken }).exec();

        res.clearCookie('oidc_state');
        res.clearCookie('oidc_nonce');

       
        const redirectBase = process.env.FRONTEND_URL || 'http://localhost:5173';
        const redirectUrl = `${redirectBase}/login/callback?token=${encodeURIComponent(accessToken)}`;
        return res.redirect(redirectUrl);
    } catch (err) {
        return res.status(401).json({ message: 'OIDC callback failed' });
    }
};


module.exports = { login, refresh, logout, clientLogin, googleAuthStart, googleAuthCallback };
