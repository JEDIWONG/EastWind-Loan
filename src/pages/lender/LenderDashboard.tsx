import DashboardCard from "../../components/generic/card/DashboardCard";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import SectionTitle from "../../components/generic/typography/SectionTitle";
import useLenderDashboardData from "../../hooks/useLenderDashboard";
import { ddCurrency } from "../../utils/data-format-helper";
import DashboardPieChart from "../../components/dashboard/DashboardPieChart";
import DashboardLineChart from "../../components/dashboard/DashboardLineChart";
import DashboardBarChart from "../../components/dashboard/DashboardBarChart";

const LenderDashboard = ()=>{

    const {
        totalOutstandingBalance,
        loanPortfolioYield,
        delinquentRate,
        monthlyDelinquentBucketComposition,
        monthlyDelinquentRateTrend,
        loanComposition,
        loading,
        error
    } = useLenderDashboardData();

    if(loading){
        return(
            <LoadingOverlay/>
        )
    }
    else{
        return(
            <>
                <div className="mx-20 my-10">
                    <SectionTitle 
                        title={"Dashboard"} 
                        desc={"View analytics and monitor lending activities."}            
                    />
    
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-10 mx-20">
    
                        <DashboardCard 
                            label={"Total Outstanding Balance"} 
                            value={ddCurrency(totalOutstandingBalance.total_outstanding_balance)}                
                        />
    
                        <DashboardCard 
                            label={"Delinquent Rate "} 
                            value={delinquentRate.delinquent_rate}       
                            trailingSymbol="%"         
                        />
    
                        <DashboardCard 
                            label={"Loan Portfolio Yield"} 
                            value={Number(loanPortfolioYield.loan_portfolio_yield)}         
                            trailingSymbol="%"       
                        />
                    </div>
                    
                    <div className="grid grid-cols-10 my-10 gap-10 items-stretch">
                        <div className="col-span-7 flex">
                            <DashboardLineChart
                                title="Delinquent Rate Per Month"
                                xAxisLabel="Month"
                                yAxisLabel="Delinquent Rate (%)"
                                data={monthlyDelinquentRateTrend.map((item) => {
                                    const date = new Date(item.month_start);
    
                                    return {
                                        label: `${date.getFullYear()}-${date.getMonth() + 1}`,
                                        value: item.delinquent_rate,
                                    };
                                })}
                                chartHeight={250}
                            />
                        </div>
    
                        <div className="col-span-3 flex">
                            <DashboardPieChart
                                title="Loan Composition By Product"
                                data={loanComposition.map((item) => ({
                                    label: item.loan_product_name,
                                    value: item.loan_count,
                                }))}
                                chartHeight={200}
                                chartWidth={200}
                            />
                        </div>
                    </div>
    
                    <DashboardBarChart
                        title="Monthly Delinquent Bucket"
                        data={monthlyDelinquentBucketComposition.map((item) => {
                            const date = new Date(item.month_start);
                        
                            return {
                                label: `${date.getFullYear()}-${date.getMonth() + 1}`,
                                "1-29": item.dpd_buckets["1-29"],
                                "30-59": item.dpd_buckets["30-59"],
                                "60-89": item.dpd_buckets["60-89"],
                                "90+": item.dpd_buckets["90+"],
                            };
                        })}
                        series={[
                            {
                                dataKey: "1-29",
                                label: "1-29",
                                stack: "dpd",
                            },
                            {
                                dataKey: "30-59",
                                label: "30-59",
                                stack: "dpd",
                            },
                            {
                                dataKey: "60-89",
                                label: "60-89",
                                stack: "dpd",
                            },
                            {
                                dataKey: "90+",
                                label: "90+",
                                stack: "dpd",
                            },
                        ]}
                        chartHeight={300}
                    />
            
                </div>
            </>
        )
    }    
    
}

export default LenderDashboard; 