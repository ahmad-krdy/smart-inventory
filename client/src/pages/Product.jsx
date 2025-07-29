import { useMemo, useState, useEffect,useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Navbar from '../layout/Navbar';
import loader from '../assets/loader.gif';
import api from '../utils/apiUtils';

const Product = () => {
  const [products,setProducts] = useState([]);
  const [formData,setFormData] = useState({product_id:"",movement_type:"",quantity_update:"",reason:""});
  const [formError,setFormError] = useState({});
  const [loading,setLoading] = useState(true);
  const closeButtonRef = useRef(null); 


  const fetchProduct = async (filterValue="all")=>{

        setLoading(true);
        const productData = await api.get("products");
        if(productData.data.status === "success"){
            setProducts(productData.data.data.products);
            setLoading(false);
        }else{
            setLoading(false);
            toast.error(productData.data.message);
        } 
  }

  useEffect(()=>{
        fetchProduct();
  },[]);

  const handleValidation = (field = 'all') => {
      let errors = { ...formError };
      let isError = false;

      if (field === 'all' || field === 'product_id') {
        if (!formData.product_id) {
          errors.product_id = 'Select product for update stock';
          isError = true;
        }
        else {
          errors.product_id = '';
        }
      }

      if (field === 'all' || field === 'movement_type') {
        if (!formData.movement_type) {
          errors.movement_type = 'Select movement type for in/out stock';
          isError = true;
        }else {
          errors.movement_type = '';
        }
      }

       if (field === 'all' || field === 'quantity_update') {
        if (!formData.quantity_update) {
          errors.quantity_update = 'Please enter quantity';
          isError = true;
        }else {
          errors.quantity_update = '';
        }
      }

      setFormError(errors);
      return isError;
  }
  
  const handleSaveCategory = async () => {
    try {
        const isValidate = handleValidation();
        if (!isValidate) {
            const productData = await api.post("stock-movement",formData);
            toast.success(productData?.data?.message);
            console.log(productData);
            closeModal();
            fetchProduct()
        }
    } catch (error) {
         toast.error(error?.response?.data?.message || 'Something went wrong');
    }
     
  };

  const closeModal = () => {
      closeButtonRef.current?.click();
      resetForm();
  };

  const resetForm = async ()=>{
      await setFormData({});
      await setFormError({});
  }

  const columns = useMemo(() => [
    {
      accessorKey: '_id',
      header: '#Sr No',
      size: 80,
      Cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
    },
    {
      accessorKey: 'category',
      header: 'Product category',
    },
    {
      accessorKey: 'stock',
      header: 'Current Stock',
    },
    {
        accessorKey:'threshold',
        header:'Threshold'
    },
    {
        accessorKey:'leadTimeDays',
        header:'Lead Time Days'
    },
    {
        accessorKey:'lastRestockedDaysAgo',
        header: 'Last Restocked Date',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: products,
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
        <h2 className='mx-3 mb-5'>Manage Products</h2>
        <div className="mx-3 d-flex align-items-center mt-5 justify-content-end mb-5" style={{ columnGap: "10px" }}>
         <div className="dropdown">
            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "#22218b",width: "130px",padding: "0px", height: "40px" }}>
               Update Stock
            </button>
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

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Stock</h5>
                </div>

                <div className="modal-body" style={{ minHeight: "50px", padding: "2rem" }} key={formData.product_id}>
                  {/* Product Name */}
                  <div className="mb-3">
                    <label className='field-lab'>Product</label>
                     <select
                        className={`form-select ${formError.product_id ? 'form-input-error' : ''}`}
                        value={formData?.product_id || ''}
                        onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                        >
                        <option value="">-Select Product-</option>
                        {products?.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                     {formError.product_id && <span className="form-label-error d-block mt-1">{formError.product_id}</span>}
                  </div>

                  {/* type Name */}
                  <div className="mb-3">
                    <label className='field-lab'>Movement Type</label>
                     <select
                        className={`form-select ${formError.movement_type ? 'form-input-error' : ''}`}
                        value={formData?.movement_type || ''}
                        onChange={(e) => setFormData({ ...formData, movement_type: e.target.value })}
                        >
                        <option value="">-Select type-</option>
                        <option value="in">In</option>
                        <option value="out">Out</option>
                    </select>
                    {formError.movement_type && <span className="form-label-error d-block mt-1">{formError.movement_type}</span>}
                  </div>
                 

                  {/* Quantity */}
                  <div className="mb-3">
                    <label className='field-lab'>Quantity</label>
                    <input
                      type="Number"
                      className={`form-control field-val ${formError.quantity_update ? 'form-input-error' : ''}`}
                      placeholder="Enter quantity"
                      value={formData?.quantity_update}
                      onChange={(e) => setFormData({ ...formData, quantity_update: e.target.value })}
                    />
                    {formError.quantity_update && <span className="form-label-error d-block mt-1">{formError.quantity_update}</span>}
                  </div>

                  {/* Reason */}
                  <div className="mb-3">
                    <label className='field-lab'>Reason</label>
                    <textarea
                      className={`form-control`}
                      rows="3"
                      placeholder="Enter reason"
                      value={formData?.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    ></textarea>
                  </div>
                </div>

               <div className="modal-footer d-flex">
                  <button type="button" className="btn btn-secondary" id="close-btn-modal" data-bs-dismiss="modal" style={{color:"#6c757d",backgroundColor:"transparent"}} ref={closeButtonRef}>Close</button>
                  <button type="button" className="btn btn-primary" id="save-btn-modal" style={{backgroundColor:"#22218b",width:"80px",padding: "0px",height: "37px"}} onClick={()=>handleSaveCategory()}>
                    Save
                  </button>
              </div>
              </div>
            </div>
          </div>

      </section>
    </>
  );

};

export default Product;
