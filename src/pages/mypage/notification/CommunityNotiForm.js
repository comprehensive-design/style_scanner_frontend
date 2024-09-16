import Sidebar from '../../../Components/Sidebar';
import NotiBox from '../../../Components/NotiBox';
import Pagination from '../../../Components/Pagination';

export default function CommunityNotiForm({ noti, itemsNum, itemsPerPage, setCurrentPage, currentPage }) {
    return (
        <div className="mypageWrapper">
            <Sidebar />
            <div className="mypageMain">
                <div>
                    <p className="title left mb05 ml03">알림</p>
                    <hr />
                </div>
                    <div>
                        {noti.length === 0 ? (
                            <p style={{marginTop:"20px"}}>알림이 없습니다.</p>
                        ) : (
                            <NotiBox noti={noti} />
                        )}
                    </div> 
                    <Pagination
                        itemsNum={itemsNum}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    /> 
            </div>
        </div>
    );
}
