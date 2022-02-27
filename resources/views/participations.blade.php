<html lang="en">
<head>
    <link class="style" rel="stylesheet" href="{{asset('plugins/switch-toggle/switch-toggle.css')}}">
     <style class="style">

     </style>
</head>
<body>
    <!-- Modal -->


<button type="button" id="periods-modal" style="display:none" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button>
    <div class="container-fluid">
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" id="exampleModalLongTitle">بازه ها</h6>
      </div>
      <div class="modal-body">
         <div class="card-body table-responsive p-0">
                  <table  class="table table-hover">
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>َشروع</th>
                            <th>پایان</th>
                            <th>قیمت</th>
                          </tr>
                    </thead>
                    <tbody id="period-table">

                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
      </div>
    </div>
  </div>
</div>
        <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">مشارکت ها</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table  class="table table-hover">
                    <thead>
                        <tr>
                            {{-- <th>ردیف</th> --}}
                            <th>نام مجری</th>
                            <th>نام محصول</th>
                            <th>نام آیتم</th>
                            <th>تعداد بازه</th>
                            <th>عملیات</th>
                          </tr>
                    </thead>
                    <tbody id="participation-table">

                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    <script class="script">
      var pageExecuterId = '{{$executer_id}}';
      var pageFlag = '{{$flag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/participations.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/participations-event.js')}}"></script>
</body>
</html>


