import React from 'react'
import TopCard from '../Components/TopCard'
import Service from '../Components/Service'
import ActivePlan from '../Components/ActivePlan'

export default function Home({ searchType, searchValue }) {
  return (
    <div>
      <TopCard searchType={searchType} searchValue={searchValue} />
      <Service searchType={searchType} searchValue={searchValue} />
      <ActivePlan searchType={searchType} searchValue={searchValue} />
    </div>
  )
}