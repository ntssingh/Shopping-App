import React,{useState} from 'react';



const Demo = () => {
    const [fdate, setFdate]= useState("");
    const [ldate, setLdate]= useState("");
    const [userdata, setUserdata]= useState("");
    const [toggle, setToggle] = useState(false);

    
   

    const handlesubmit=(e)=>{
        e.preventDefault();
        fetch(`https://smppintl.datagenit.com/apismpp/v1/billing.php?user_id=1&method=cus_summary_all&date_from=${fdate}&date_to=${ldate}&token=b8860908f2cf45f721a40d23f2e291f9&user_type=Admin`)
        .then((res)=>{
            return res.json();
        })
        .then((adata)=>{
            setUserdata(adata.data);
        })
    }
    console.log(userdata
    );


    const calculateTotalCost = () => {
        const totalCosts = {};
    
        Object.keys(userdata).forEach(index1 => {
          let total = 0;
          Object.keys(userdata[index1]).forEach(index2 => {
            total += parseFloat(userdata[index1][index2].totalcost || 0);
          });
          totalCosts[index1] = total;
        });
    
        return totalCosts;
      };

      const totalCosts = calculateTotalCost();


      function allSum(obj){
        let sum= 0;
        for(let value of Object.values(obj)){
            sum+=value;
        }
        return sum.toFixed(2);
      }
      const allusum= allSum(totalCosts);


      
      

  return (
    <div>
        <div style={{boxShadow: '1px 2px 9px #F4AAB9',
    margin: '4em',
    padding: '1em'}}>
    <form  onSubmit={handlesubmit}>
        <label style={{margin:'1em'}}>from</label>
        <input
         type="date"
         value={fdate}
         onChange={(e)=>setFdate(e.target.value)}
        />
        <label style={{margin:'1em'}}>to</label>
        <input
         type="date"
         value={ldate}
         onChange={(e)=>setLdate(e.target.value)}
        />
        <button type = 'submit' style={{margin:'1em', backgroundColor:'blue', color:'white', padding:'1em', borderRadius:'1em', border:'none', cursor:'pointer'}}>Search</button>
    </form>
    </div>

  <h3 style={{margin:'4em'}}>Total cost of all company= {allusum}</h3>
            <div >
               
            {
                Object.keys(userdata).map(name => (
                    
                    <div style={{boxShadow: '1px 2px 9px #F4AAB9',
                    margin: '4em',
                    padding: '1em'}} key={name}>
                      <ul><li style={{listStyle:'none', marginBottom:'1em'}} onClick={() => setToggle(!toggle)}><h3 >{name}</h3></li></ul>
                      {toggle&&
                      <ul>
                        {Object.keys(userdata[name]).map(ccode => (
                          <li style={{listStyle:'none'}}key={ccode}>
                            
                            <strong>Country code :</strong>({ccode}
                            )<ul>
                              {Object.keys(userdata[name][ccode]).map(key => (
                                <li  style={{listStyle:'none', display:'inline-block', marginRight:'4em', marginBottom:'0.5em'}}key={key}>
                                  <strong>{key}:</strong> {userdata[name][ccode][key]}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
}
                    </div>
                  ))
            }
            
            </div>

          
    


    </div>
  )
}

export default Demo






