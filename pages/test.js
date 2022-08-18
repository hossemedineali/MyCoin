import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";


const Test = () => {

    const [formValues, setFormValues] = useState({
        name:{
          value:'',
          error:false,
          errorMessage:'You must enter a name',
          touched:false
        },
        age:{
          value:21,
          error:false,
          errorMessage:'You must enter an age'
        },
        likes:{
          value:'',
          error:false,
          errorMessage:'You must enter your liked tech stacks'
        },
        jobTitle:{
          value:'full-stack',
          error:false,
          errorMessage:'You must choose your job title'
        }
      })



    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formFields = Object.keys(formValues);
        let newFormValues = {...formValues}
    
        for (let index = 0; index < formFields.length; index++) {
          const currentField = formFields[index];
          const currentValue = formValues[currentField].value;
    
          if(currentValue === ''){
            newFormValues = {
              ...newFormValues,
              [currentField]:{
                ...newFormValues[currentField],
                error:true
              }
            }
          }
    
        }
    
        setFormValues(newFormValues)
      }

      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
          ...formValues,
          [name]:{
            ...formValues[name],
            value,
            touched:true
          }
        })
      }


     const onBlur=(e)=>{


        if(formValues[e.target.name].touched==true&&(e.target.value ===''|| e.target.value.length < 3)){
            setFormValues({
                ...formValues,
                [e.target.name]:{
                  ...formValues[e.target.name],
                  error:true,
                  touched:false
                }
              })
     }else{
        setFormValues({
            ...formValues,
            [e.target.name]:{
              ...formValues[e.target.name],
              error:false,
              touched:false
            }
          })
     }
    
    }

    const onFocus=(e)=>{
        setFormValues({
            ...formValues,
            [e.target.name]:{
              ...formValues[e.target.name],
              touched:true
            }
          })
    }

    return (<>
    
          <Container  >
      <form noValidate onSubmit={handleSubmit} >
      
          <Typography 
            variant="h6">
              Please enter your data
          </Typography>

          <TextField 
            placeholder="Enter your name"
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            onBlur={onBlur}
            value={formValues.name.value}
            onFocus={onFocus}
            onChange={handleChange}     
            error={formValues.name.error}
            helperText={formValues.name.error && formValues.name.errorMessage}
          />

          <TextField 
            placeholder="Enter your age"
            label="Age"
            name="age"
            variant="outlined"
            fullWidth
            required
            type="number"
            
            value={formValues.age.value}
            onChange={handleChange}
            error={formValues.age.error}
            helperText={formValues.age.error && formValues.age.errorMessage}
            />

          <TextField 
            placeholder="Describe the best tech stack you worked with and you like most?"
            label="Likes"
            name="likes"
            variant="outlined"
            fullWidth
            required
            
            value={formValues.likes.value}
            multiline
            rows={4}
            onChange={handleChange}
            error={formValues.likes.error}
            helperText={formValues.likes.error && formValues.likes.errorMessage}
          />

          <FormControl  >
          
            <FormLabel>Job title</FormLabel>

            
            <RadioGroup name="jobTitle" value={formValues.jobTitle.value} onChange={handleChange} >
              
              <FormControlLabel value="full-stack" control={<Radio />} label="Full stack" />
              
              <FormControlLabel value="backend" control={<Radio />} label="Backend" />
              <FormControlLabel value="frontend" control={<Radio />} label="Frontend" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            
            
          >
              Submit
          </Button>
      </form>
    </Container>
    </>  );
}
 
export default Test;




/*
  const onBlur=(e)=>{

        if(formValues[e.target.name].touched==true&&(e.target.value ===''|| e.target.value.length < 3)){
            
            setFormValues({
                ...formValues,
                [e.target.name]:{
                  ...formValues[e.target.name],
                  error:true,
                  touched:false
                }
              })

              }
            //setFormValues()

        }
        console.log(typeof(e.target.value))
       }
*/