import React from 'react';
import RecommendationWidget from './recomendationChart';
import CompanyNewsContainer from './CompanyNewsContainer';
import StockNewsContainer from './stockNewsContainer';
import './css/analysisPage.css'

function AnalysisPage() {
    return (
        <div style={{ backgroundColor: '#121212', minHeight: '150vh', paddingBottom: '50px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="recsCompany" style={{ display: 'flex', justifyContent: 'center', height:'100%' }}>
                <div className="reco" style={{ width: '50%', marginTop: '20px', justifyContent: 'center' }}>
                    <RecommendationWidget />
                </div>
                <div className="companyNews" style={{ width: '50%', marginTop: '20px' }}>
                    <CompanyNewsContainer />
                </div>
            </div>
            <StockNewsContainer />
        </div>
    );
}

export default AnalysisPage;
