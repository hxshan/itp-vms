import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const DashboardHero = () => {

    const [users,error,loading,axiosFetch]=useAxios()
    const [counts,setCounts]=useState([0,0,0])
    const [total,setTotal]=useState(0)
    const getData=()=>{
        axiosFetch({
            axiosInstance:axios,
            method:'GET',
            url:'/user/'
        })
    }

    useEffect(()=>{
        let active=0;
        let inactive=0
        let suspended=0;
        if(users && users.length > 0){
            users.forEach(user=>{
                if(user.status=='active')
                    active+=1
                if(user.status=='inactive')
                    inactive+=1
                if(user.status=='suspended')
                    suspended+=1              
            })
        }
        setCounts([active,inactive,suspended])
        setTotal(active+inactive+suspended)
    },[users])
useEffect(()=>{
    getData()
},[])

    const chartData = {
        labels: ['Active', 'Inactive', 'Suspended'],
        datasets: [
          {
            label: 'No of Users',
            data:counts,
            backgroundColor: [
              'rgba(116, 248, 53, 0.8)',
              'rgba(255, 46, 46, 0.8)',
              'rgba(255, 138, 43, 0.8)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(82, 255, 0, 0.8)',
              'rgba(255, 0, 0, 0.8)',
              'rgba(255, 115, 0, 0.8)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };
  return (
    <div className='w-full h-fit bg-white p-8 rounded-md flex'>
        <div className='w-[400px] h-[400px]'>
            <Pie data={chartData} /> 
        </div>
        <div className='w-full h-fit flex flex-col gap-4'>
            <div className='w-full py-4 px-8 rounded-md bg-green-400 h-fit'>
                <p>Total No of Users:{total}</p>
            </div>
            <h2 className='underline text-xl ml-4'>Latest User</h2>
            <div className='w-full py-4 px-8 rounded-md bg-white h-fit'>
                <div className='w-fit px-8 flex flex-col gap-2 shadow-lg py-8'>
                    <p>First Name : {users[users.length-1]?.firstName}</p>
                    <p>Last Name : {users[users.length-1]?.lastName}</p>
                    <p>Role : {users[users.length-1]?.role.name }</p>
                </div>

            </div>
        </div>
        
        
    </div>
  )
}

export default DashboardHero