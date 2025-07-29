 <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{ formEditMode ? 'Edit Category' : 'Create Category'}</h5>
                </div>

                <div className="modal-body" style={{ minHeight: "50px", padding: "2rem" }} key={formEditMode ? 'create' : 'edit'}>
                  {/* Category Name */}
                  <div className="mb-3">
                    <label className='field-lab'>Category Name</label>
                    <input
                      type="text"
                      className={`form-control field-val ${formError.name ? 'form-input-error' : ''}`}
                      placeholder="Enter category name"
                      value={formData?.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formError.name && <span className="form-label-error d-block mt-1">{formError.name}</span>}
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