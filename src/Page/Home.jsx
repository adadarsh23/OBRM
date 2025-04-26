import React from 'react'
import TopCard from '../Components/TopCard'
import Service from '../Components/Service'
import ActivePlan from '../Components/ActivePlan'
import ViewDocument from '../Components/ViewDocument'
import Bill from '../Components/Bill'
import Customer from '../Components/Customer'
import Data from '../Components/Data'
import Details from '../Components/Details'
import ActCard from "../Components/ActCard"

export default function Home({ searchType, searchValue }) {
  return (
    <div>
      <TopCard searchType={searchType} searchValue={searchValue} />
      <Service searchType={searchType} searchValue={searchValue} />
      <ActivePlan searchType={searchType} searchValue={searchValue} />
      <ViewDocument searchType={searchType} searchValue={searchValue} />
      <Bill searchType={searchType} searchValue={searchValue}/>
      <Details searchType={searchType} searchValue={searchValue}/>
      <Customer searchType={searchType} searchValue={searchValue}/>
      <Data searchType={searchType} searchValue={searchValue}/>
      <ActCard searchType={searchType} searchValue={searchValue} />
    </div>
  )
}