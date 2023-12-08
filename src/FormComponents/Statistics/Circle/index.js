// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card , CardHeader , CardBody } from 'reactstrap';

const ApexDonutChart = ({ colors=["#198754" , "#ffc107" , "#dc3545" ],className="",tiltle="الإحصائيات", labels=[] , series=[],...props }) => {

// ** Chart Options
    const options = {
        legend: {
        show: true,
        position: 'bottom'
        },
        labels: labels ,

        colors: colors,
        dataLabels: {
        enabled: true,
        formatter(val) {
            return `${parseInt(val)}%`;
        }
        },
        plotOptions: {
        pie: {
            donut: {
            labels: {
                show: false,
                name: {
                fontSize: '2rem',
                fontFamily: 'Montserrat'
                },
                value: {
                fontSize: '1rem',
                fontFamily: 'Montserrat',
                formatter(val) {
                    return `${parseInt(val)}%`;
                }
                },
                total: {
                show: false,
                fontSize: '1.5rem',
                }
            }
            }
        }
        },
        responsive: [
        {
            breakpoint: 992,
            options: {
            chart: {
                height: 400
            },
            legend: {
                position: 'bottom'
            }
            }
        },
        {
            breakpoint: 576,
            options: {
            chart: {
                height: 450
            },
            plotOptions: {
                pie: {
                donut: {
                    labels: {
                    show: false,
                    name: {
                        fontSize: '1.5rem'
                    },
                    value: {
                        fontSize: '1rem'
                    },
                    total: {
                        fontSize: '1.5rem'
                    }
                    }
                }
                }
            }
            }
        }
        ]
    };

    // ** Chart Series

    return (
        <>
        {
        true ? <>
        <Card className={className}>
            <CardHeader className="p-0 text-center">
                <h4 className='text-center text-primary fs-5 fw-bold w-100 p-2'>
                {tiltle}
                </h4>
            </CardHeader>
            <CardBody className='px-0 ApexDonutChartSts'>
                {series && series?.length && !series?.includes(NaN) ? <Chart options={options} series={series} type="donut" height={350}/> : <div className='w-100 fs-4 text-center text-muted'>لا توجد بيانات تفصيلية</div>}
            </CardBody>
            </Card>
        </>  : null
        }
        </>
    );
};

export default ApexDonutChart;
