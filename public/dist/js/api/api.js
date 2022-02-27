class Api{
    getRepresentationDetailsByDomain()
    {
        var url = `${apiUrl}/representation/representationDetail`;
        var data = {
            "domain" : `${domain}`
        };
       return this.ajaxJson(url,'GET',data);
    }

    getAccount()
    {
        var url = `${apiUrl}/api/account`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getRepresentationDetailsByAuth()
    {
        var url = `${apiUrl}/representation/representationDetail`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getCategories(flag,parent_id = null)
    {
        var url = `${apiUrl}/admin/categories?flag=${flag}&parent_id=${parent_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    storeCategory(data)
    {
       var url = `${apiUrl}/admin/categories`;
       return this.ajaxFormData(url,'POST',data);
    }

    updateCategory(data,id)
    {
       var url = `${apiUrl}/admin/categories/${id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

    getProducts(flag,category_id = null)
    {
        var url = `${apiUrl}/admin/products?flag=${flag}&category_id=${category_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    storeProduct(data)
    {
       var url = `${apiUrl}/admin/products`;
       return this.ajaxFormData(url,'POST',data);
    }

    updateProduct(data,id)
    {
       var url = `${apiUrl}/admin/products/${id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

    getItems(flag,product_id = null)
    {
        var url = `${apiUrl}/admin/items?flag=${flag}&product_id=${product_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    storeItem(data)
    {
       var url = `${apiUrl}/admin/items`;
       return this.ajaxFormData(url,'POST',data);
    }

    updateItem(data,id)
    {
       var url = `${apiUrl}/admin/items/${id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

    getProperties(flag,product_id = null)
    {
        var url = `${apiUrl}/admin/properties?flag=${flag}&product_id=${product_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    storeProperty(data)
    {
       var url = `${apiUrl}/admin/properties`;
       return this.ajaxFormData(url,'POST',data);
    }

    updateProperty(data,id)
    {
       var url = `${apiUrl}/admin/properties/${id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

     getParticipations(flag,executer_id = null)
    {
        var url = `${apiUrl}/admin/participations?flag=${flag}&executer_id=${executer_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    updateParticipation(data,id)
    {
       var url = `${apiUrl}/admin/participations/${id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

    getParticipationPeriods(flag,search = null)
    {
        var url = `${apiUrl}/admin/participationPeriods?flag=${flag}&search=${search}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getItemPeriods(flag,search = null)
    {
        var url = `${apiUrl}/admin/itemPeriods?flag=${flag}&search=${search}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    updateItemPeriods(data,item_id)
    {
       var url = `${apiUrl}/admin/itemPeriods/${item_id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

    getPage(url,data)
    {
        var response = $.ajax({
            "url": url,
            "method": 'GET'
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
           if(jqXHR.status == 401)
             window.location.href = '/login';
        });
        return response;
    }

    ajaxJson(url,method,data)
    {
        var response =  $.ajax({
            "url": url,
            "method": method,
            "data": data,
            "timeout": 0,
            "dataType":"json",
            "crossDomain" : true,
            "headers": {
                "Content-Type": "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization": `Bearer ${api_token}`
             },
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
           if(jqXHR.status == 401)
             window.location.href = '/login';
        });
        return response;
    }

    ajaxFormData(url,method,data)
    {
        var response = $.ajax({
            "url": url,
            "method": "POST",
            "_method":method,
            "type":"POST",
            "data": data,
            "timeout": 0,
            "processData": false,
            "contentType": false,
            "headers": {
                "X-HTTP-Method-Override": method,
                "Authorization": `Bearer ${api_token}`
             },
        });
         response.fail(function(jqXHR, textStatus, errorThrown){
           if(jqXHR.status == 401)
             window.location.href = '/login';
        });
        return response;
    }
}
