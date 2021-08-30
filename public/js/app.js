const App = ()=>{
    const [products,setProducts] = React.useState([]);

    const [form,setForm]  = React.useState({
        name : '',
        price : ''
    })

    React.useEffect(() => {
        fetchProducts();
    }, [])

    function fetchProducts() {
        fetch('/api/products')
        .then((res) => res.json())
        .then(data => {
            setProducts(data);
        })
    }

    function handleSubmit(e){
        e.preventDefault(); // to stop event from submitting
        if (!form.name || !form.price) {
            return;
        }
        fetch('/api/products',{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        }).then(res => res.json()).then(data => {
            fetchProducts();
            setForm({name : '',price : ''});
        })
    }

    function updateForm(event,field) {
            if (field === 'name') {
            setForm({
                ...form,
                name : event.target.value,
            })
            }else if (field === 'price') {
                setForm({
                    ...form,
                    price : event.target.value
                })
            }
    }

    function DeleteDude(productId) {
        fetch(`/api/products/${productId}`,{
            method : 'DELETE'
        }).then((res) => res.json())
        .then((data) => {
            fetchProducts();
            console.log(data);
        })
    }

    return(
    <>
        <div className="card">
                    <div className="card-header">
                        Add a product
                    </div>
                    <div className="card-body">
                        <form onClick={handleSubmit}>
                            <input type="text" value={form.name} onChange={() => updateForm(event,'name')} placeholder="Product name..." className="form-control mt-3"/>
                            <input type="text" value={form.price} onChange={()=> updateForm(event,'price')} placeholder="Product price..." className="form-control mt-3"/>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
        </div>        
        <ul className="list-group">
                {
                    products.map((product)=> {
                        return(
                        <li key= {product.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                            <strong>{product.name}</strong>: 
                            ${product.price}
                            </div>
                        <button className="btn" onClick = {() => DeleteDude(product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive"
                       viewBox="0 0 16 16">
                       <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5
                       0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5
                       1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0
                       1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/></svg>
                        </button>
                        </li>
                    )
                })
                }
        </ul>    
    </>
    )
}

ReactDOM.render(<App/>,document.getElementById('app'));
