import { useMemo, useState, useEffect,useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Navbar from '../layout/Navbar';
import loader from '../assets/loader.gif';
import api from '../utils/apiUtils';

const Alertdashboard = () => {
  const [alertInventories,setAlertInventory] = useState([]);
  const [loading,setLoading] = useState(true);


  const fetchInventoryAlert = async (filterValue="all")=>{

        setLoading(true);
        const endpoint = filterValue === 'all'? 'inventory-alerts': `inventory-alerts?level=${filterValue.toLowerCase()}`;
        const alertData = await api.get(endpoint);
        if(alertData.data.status === "success"){
            setAlertInventory(alertData.data.data.alerts);
            setLoading(false);
        }else{
            setLoading(false);
            toast.error(alertData.data.message);
        } 
  }

  useEffect(()=>{
        fetchInventoryAlert();
  },[]);

  const columns = useMemo(() => [
    {
      accessorKey: '_id',
      header: '#Sr No',
      size: 80,
      Cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'productId.name',
      header: 'Product Name',
    },
    {
      accessorKey: 'productId.category',
      header: 'Product category',
    },
    {
      accessorKey: 'level',
      header: 'Level',
      Cell: ({ cell }) => {
              const level = cell.getValue();
              const levelColor = {
                 critical: 'danger',
                 high: 'warning',
                 medium: 'info',
                 low: 'success',
                }[level] || 'secondary';

                return (
                    <span className={`badge bg-${levelColor}`} style={{ textTransform: 'capitalize' }}>
                        {level}
                    </span>
                );
    },
    },

    {
      accessorKey: 'message',
      header: 'Message',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: alertInventories,
    state: { isLoading: loading },
    enableColumnFilters: false,
    enableSorting: true,
    enablePagination: true,
    initialState: { pagination: { pageSize: 5 } },
  });

//   console.log("formData:- ",formData);
  return (
    <>
      <Navbar />
      <section className="container-fluid" style={{marginTop:"50px"}}>
        <h2 className='mx-3'>Inventory Alerts</h2>
        <div className="mx-3 d-flex align-items-center mt-5 justify-content-end mb-5" style={{ columnGap: "10px" }}>
    
            <div className='d-flex align-items-center'>
                <div style={{display: "flex",marginRight: "5px",alignItems: "center"}}>
                    <i className="fas fa-filter" style={{fontSize: "14px"}}></i>
                    <h5 style={{fontWeight: 500,marginLeft: "4px",fontSize: "15px",marginBottom: "0px"}}>Filter</h5>
                </div>
                <select
                className="form-select form-select w-auto"
                aria-label=".form-select-lg example"
                //value={viewFilter}
                onChange={(e)=>fetchInventoryAlert(e.target.value)} // Attach onChange handler
                >
                <option value="all">All</option>
                <option value="critical">critical</option>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
                </select>
            </div>
        </div>
        {
           (loading)
           ?
              <div className='loader-container' style={{height:"70vh"}}>
                 <img src={loader} alt="" style={{height:"70px"}}/>
              </div>
           :
              <MaterialReactTable table={table} className="" />
        }
      
        <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
        />

      </section>
    </>
  );

};

export default Alertdashboard;
