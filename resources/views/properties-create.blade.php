<html lang="en">
<head>
    <link class="style" rel="stylesheet" href="{{asset('plugins/switch-toggle/switch-toggle.css')}}">
     <style class="style">
         td{
            word-break: break-all;
            text-align: center;
         }
         .input-label{
            font-size: 12px;
         }
         .input-name{
            font-size: 12px;
         }
       th{
           text-align: center;
       }
       .operator{
           padding: 1px,1px,1px,1px;
           font-size: 10px;
           margin: 2px;
       }
       .operator.remove-category
       {
           font-size: 14px;
       }
       .operator.add-subCat
       {
        font-size: 12px;
       }
       .category-operator{
           width: 18%;
       }
       .category-label{
           width: 18%;
           font-size: 14px;
       }
       .category-name{
           width: 18%;
           font-size: 14px;
       }
       .category-parent{
           width: 18%;
           font-size: 14px;
       }
       .category-details{
           width: 12%;
           font-size: 12px;
       }

       .category-show-parent{
           width: 18%;
           font-size: 14px;
       }
       .breadcrumb-item a{
          color: inherit;
          cursor: pointer;
       }
       .breadcrumb-item.active a{
           color: blueviolet;
       }
       #add-subCat-name{
           text-decoration: underline;
           color:chartreuse;
           cursor: pointer;
       }
     </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row" id="create-category">
            <div class="col-md-2 col-lg-3 col-sm-1"></div>
            <div class="col-md-8 col-lg-6 col-sm-10"><!-- general form elements -->
              <div class="card card-primary">
                  <div class="card-header">
                  <h3 class="card-title">ساخت خصوصیات جدید : <a id="add-subCat-name"></a></h3>
                </div>
                <!-- /.card-header -->
                  <div class="card-body">
                    <div class="form-group">
                        <div class="form-group">
                            <label>محصول</label>
                            <select id="form-property-product" class="form-control select2" style="width: 100%;">
                            </select>
                            <label id="product_id" class="control-label text-danger errors" for="form-property-product"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                            <label>نوع</label>
                            <select id="form-property-type" class="form-control select2" style="width: 100%;">
                            </select>
                            <label id="property_type_id" class="control-label text-danger errors" for="form-property-type"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                        <label>برچسب</label>
                        <input id="form-property-label" type="text" class="form-control" placeholder="متن برچسب را وارد کنید ...">
                        <label id="label" class="control-label text-danger errors" for="form-property-label"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                        <label>حداکثر سایز</label>
                        <input id="form-property-size" type="text" class="form-control" placeholder="حداکثر سایز را وارد کنید ...">
                        <label id="size" class="control-label text-danger errors" for="form-property-size"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                        <label>راهنما</label>
                        <input id="form-property-placeholder" type="text" class="form-control" placeholder="متن راهنما را وارد کنید ...">
                        <label id="placeholder" class="control-label text-danger errors" for="form-property-placeholder"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                        <label>تولتیپ</label>
                        <input id="form-property-tooltip" type="text" class="form-control" placeholder="متن تولتیپ را وارد کنید ...">
                        <label id="tooltip" class="control-label text-danger errors" for="form-property-tooltip"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group col-1">
                        <label>ضروری</label>
                        <input id="form-property-required" type="checkbox" class="form-control">
                        </div>
                    </div>
                      <!-- /.form-group -->
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button id="btn-create-property" class="btn btn-primary">ثبت</button>
                  </div> </div>
            </div>
            <div class="col-md-2 col-lg-3 col-sm-1""></div>
        </div>
      </div><!-- /.container-fluid -->
    <script class="script">
      var pageProductId = '{{$product_id}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/properties-create.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/properties-create-event.js')}}"></script>
</body>
</html>


