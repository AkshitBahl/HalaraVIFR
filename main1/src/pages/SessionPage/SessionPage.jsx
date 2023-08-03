import React from 'react'
import { useParams } from 'react-router-dom'
import PieChart from '../../components/Charts/PieChart';
import TutorialChart from '../../components/Charts/TutorialChart';
import AdlCompareChart from '../../components/Charts/AdlCompareChart';

const SessionPage = () => {
    let { childid } = useParams();

  return (
    <div>
        <h3>Session details</h3>
      {childid}

      <AdlCompareChart/>
        <PieChart/>

       <TutorialChart/>
    </div>
  )
}

export default SessionPage
