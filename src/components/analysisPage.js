import React, { useState } from 'react';
import RecommendationWidget from './recomendationChart'
import CompanyNewsContainer from './CompanyNewsContainer'
import StockNewsContainer from './stockNewsContainer'

function AnalysisPage()
{
    return(
        <div>
            <RecommendationWidget/>
            <CompanyNewsContainer/>
            <StockNewsContainer/>
        </div>

    );
}

export default AnalysisPage;