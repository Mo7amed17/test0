import { Badge, Table } from 'reactstrap';
import "./style.css"
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { Button } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import Modal from "Actions/NiceModal"

const Index = ({ headers=[] , data=[] , title , buttonTitle =undefined, titleColor ="primary" , NiceModalComponent=<></> , NiceModalTitle="" ,...props }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; 
    
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = data?.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const handleNiceModal=()=>{
        NiceModal.show(Modal,{
            name:"M17",
            title:NiceModalTitle,
            Component:NiceModalComponent,
        })
    }

    return (
        <div className='TableView'>
                <Badge color={titleColor} style={{marginRight:"10px",fontSize:"12px"}}>{ title }</Badge>
            <Table bordered dir='rtl' className='mt-1'>
                <caption>
                    {buttonTitle ? <Button dir='ltr' style={{backgroundColor:"#08aa08"}} type='primary' color="red" icon={<TiPlus />} size={20} onClick={handleNiceModal}>{buttonTitle}</Button> : <></>}
                </caption>
                <thead>
                <tr style={{textAlign:'center'}}>
                    {
                        headers?.map((header,index)=>{
                            return(
                                <th style={{width:header?.width || "350px",backgroundColor:"#f2f2f2"}} key={`Key-${index}`}>{header?.title}</th>
                            )
                        })
                    }
                </tr>
                </thead>
                    {
                        currentPageData?.length ? currentPageData?.map((Obj,index)=>{
                            return(
                                <tbody style={{textAlign:'center'}} key={`key.${index}`}>
                                    <tr>
                                        {Object.values(Obj).map((d)=>{
                                            return(
                                                <td>{d}</td>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            )
                        }): 
                        <tbody>
                            <tr>
                                <td colSpan={headers?.length} className='text-center'><span className='fs-3 text-secondary'>لا توجد بيانات</span></td>
                            </tr>
                        </tbody>
                    }
            </Table>
            {
                currentPageData?.length ? 
                <ReactPaginate
                previousLabel={'السابق'}
                nextLabel={'التالي'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'ActivePagenation'}
            /> : <></>
            }
            
        </div>
    );
}

export default Index;
