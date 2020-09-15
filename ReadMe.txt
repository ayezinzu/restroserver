**************************************************
Categories Api
**************************************************

Add Category (POST)
    category/addcategory
    param: name & image(both required)

Get CategoryList (GET)
    category/getCategory

Update Category (PUT)
    category/updateCategory
    param: id, name & image(both required)

Delete Category (DELETE)
    category/deleteCategory/<categoryId>


**************************************************
Sub Category Api
**************************************************

Add SubCategory (POST)
    subcategory/addsubCategory
    param: name & category (both required)

Get SubCategoryList (POST)
    subcategory/getsubCategory
    param: restaurant, category

Update SubCategory (PUT)
    subcategory/updatesubCategory
    param: id, name & category, restaurant (both required)

Delete SubCategory (DELETE)
    subcategory/deletesubCategory/<subcategoryID>

**************************************************
Addons Api
**************************************************

Add Addons (POST)
    addons/addAddons
    parma: name and price

Get Addons  (Get)
    addons/getAddons

Update Addons (PUT)
    addons/updateAddons
    param: id, name and price

Delete Adons (DELETE)
    addons/deleteAddons/<id>

**************************************************
Item Api
**************************************************

Add Item (POST)
    item/addItem
    param: name(required), 
            description, price(required), 
            category(required), 
            subcategory(required), 
            addons[{
                name, description, category, option
            }], 
            isSpicy(default:false), image, restaurant

Get Item (POST)
    item/getItem
    param:  restaurant

Get Item Subcategory Wise (POST)
    item/getItemBySubcategory
    param: id

Update Item (PUT)
    item/updateItem
    param: id, restaurant, name(required), description, price(required), category(required), subcategory(required), addons[], isSpicy(default:false), image

Delete Item (delete)
    item/deleteItem/<id>

**************************************************
Specials Api
**************************************************

Add Specials    
    specials/addSpecials
    param: name, description, price, category, subcategory, image, isSpicy, deleteCategory, restaurant

Get Specials (POST)
    specials/getSpecial
    param: restaurnat
    
Update Specials
    specials/updatespecials
    param: id, name, description, price, category, subcategory, image, isSpicy, deleteCategory. restaurant

Delete Specials
    specials/deleteSpecials/<id>

**************************************************
Order Api
**************************************************

Add Order (POST)
    order/addOrder
    params: items: [{ item, quantity, price, addons:[{name, price, category}]  }], user(number), total(number), description, restaurant

Get Order (POST)
    order/getOrder
    param: restaurant

Update Order (PUT)
    order/UpdateOrder
    params: id, items: [{ item, quantity, price, addons:[{name, price, category}]  }], user(number), total(number), description, restaurant, isComplete

Delete Order (DELETE)
    order/DeleteOrder/<id>

**************************************************
Notification Api
**************************************************

Add Notification (POST)
    notification/addNotification
    params: title, description, restaurant

Get Notification (POST)
    notification/getNotification
    param: restaurant

Update Notification (PUT)
    notification/ updateNotification, restaurant

Delete Notification (DELETE)
    notification/deleteNotification

**************************************************
Restaurant SignIn/SignUp Api
**************************************************

SignIn (POST)
    restaurant/restaurantSignin
    param: username, password

SignUp (POST)
    restaurant/restaurantSignup
    param: name, username, password