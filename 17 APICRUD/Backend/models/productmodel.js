import sql from '../config/dbconfig.js';

class Product {
    constructor(product){
        this.categoryId = product.categoryId;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
    }

    //vamos a crear un producto
    static create(newProduct, result){
        if(!newProduct.name && !newProduct.price && !newProduct.categoryId){
            sql.query('INSERT INTO products VALUES (?,?,?,?)', newProduct(newProduct.id , newProduct.categoryId, newProduct.name, newProduct.price, newProduct.stock), (err, res) => {
                if(err){
                    console.log('Error al crear el producto', err);
                    result(err, null);
                    return;
                }
                console.log('Producto creado con exito', { id: res.insertId, ...newProduct });
                result(null, { id: res.insertId, ...newProduct });
            });
        } else {
            sql.query('INSERT INTO products (categoryId, name, price, stock) VALUES (?,?,?,?)', [newProduct.categoryId, newProduct.name, newProduct.price, newProduct.stock], (err, res) => {
                if(err){
                    console.log('Error al crear el producto con el nombre ${newProduct.ProductName}', err);
                    result(err, null);
                    return;
                }else {
                    console.log('Producto creado con exito', { id: res.insertId, ...newProduct });
                    result(null, { id: res.insertId, ...newProduct });
                }
            });
        }
    }
}

export default Product;
