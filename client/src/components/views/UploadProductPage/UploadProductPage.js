import React,{useState} from 'react'
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import FileUpload from '../../Utils/FileUpload';
import Axios from 'axios';
const {Title} = Typography;
const { TextArea} = Input;
const Continents = [
    {key:1, value:"Africa, mtsm"},
    {key:2, value:"Europe i got nothin"},
    {key:3, value:"Asia -_-"},
    {key:4, value:"North Americano"},
    {key:5, value:"South West Baby"},
    {key:6, value:"Aostralia!!!Yhea boyii"},
    {key:7, value:"Antarctica, christ"}

]
function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue,setContinentValue] = useState(1);

    const [Images,setImages] = useState([])

    const onTitleChange = (event) =>{
        setTitleValue(event.currentTarget.value);
    }

    const onDescriptionChange = (event) =>{
        setDescriptionValue(event.currentTarget.value);
    }

    const onPriceChange = (event)=>{
        setPriceValue(event.currentTarget.value);
    }

    const onContinentSelectChange= (event)=>{
        setContinentValue(event.currentTarget.value);
    }

    const updateImages = (newImages)=>{
        console.log(newImages)
        setImages(newImages)
    }
    const onSubmit = (event) =>{
        event.preventDefault();
        const variables = {
            writer: props.user.userData._id,
            title:TitleValue,
            description:DescriptionValue,
            price:PriceValue,
            images:Images,
            continents:ContinentValue
        }
        Axios.post('/api/product/uploadProduct',variables)
        .then(response=>{
            if(response.data.success){

                alert('abate succes upload Product path yilihal');
                props.history.push('/');
            }else{
                alert('Failed to uppload Product');
            }
        })
    }
    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>

            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form onSubmit>
                <FileUpload refreshFunction={updateImages}/>
                {/*Drop zone*/}
                <br/>
                <br/>

                
                <label>Title</label>
                <Input
                onChange={onTitleChange}
                value={TitleValue}/>
                <br/>
                <br/>

                <label>Description</label>
                <TextArea
                onChange={onDescriptionChange}
                value={DescriptionValue}/>
                 <br/>
                 <br/>

                <label>Price($)</label>
                <Input
                onChange={onPriceChange}
                value={PriceValue}
                type="number"/>              

                 <select onChange={onContinentSelectChange} value={ContinentValue}>
                     {
                         Continents.map(item=>(
                             <option key={item.key} value={item.key}>{item.value}</option>
                         ))
                     }
                 </select>

                <Button
                onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
