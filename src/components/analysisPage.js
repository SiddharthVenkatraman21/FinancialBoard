import React from 'react';
import RecommendationWidget from './recomendationChart';
import CompanyNewsContainer from './CompanyNewsContainer';
import StockNewsContainer from './stockNewsContainer';

function AnalysisPage() {
    return (
        <div style={{ backgroundColor: '#202124', minHeight: '150vh', paddingBottom: '50px', color:'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="reco" style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <RecommendationWidget />
            </div>
            <CompanyNewsContainer />
            <StockNewsContainer />
        </div>
    );
}

export default AnalysisPage;
