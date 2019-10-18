import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
//import Fab from '@material-ui/core/Fab';
//import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export class PolicyHolderDetails extends Component
{

    constructor(props)
    {
        super(props);

        this.state={
            adharCardNo:0,
            firstName: '',
            lastName: '',
            email:'',
            mobileNo:0,
        }

    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };
    submit=(e)=>{
        e.preventDefault();
        //console.log(this.state.cust);
        const obj = {
            adharCardNo: this.state.adharCardNo,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email:this.state.email,
            mobileNo:this.state.mobileNo
        };
        console.log(obj);
        axios.post('http://insapp2019.ap-south-1.elasticbeanstalk.com/addPolicyHolder',
            obj)
            .then(res => {
                console.log(res.data)
                window.location.href="/Driver";
            });


        //this.props.history.push('/Solutions');

    }


    componentWillReceiveProps(nextProps)
    {
        console.log('[Create.js] will receive props', nextProps);

    }

    shouldComponentUpdate(nextProps,nextState)
    {
        console.log('[Create.js] will update',nextProps,nextState)
        return true;
    }
    render()
    {
        return(
           <Paper>

                <Typography variant="h6" color="inherit">
                Policy Holder Details
                </Typography>


                <form onSubmit={this.submit}>
                <Grid container spacing={1}>
                <Grid item xs={12} >
                    <TextField fullWidth margin="dense"
                               id="adharCardNo"
                               required label="Adhar Card No"
                               value={this.state.adharCardNo}
                                onChange={this.handleChange("adharCardNo")}
                    />
                  </Grid>

                    <Grid item xs={12} >
                    <TextField  fullWidth margin="dense" required label="First Name"
                                id="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange("firstName")}
                                />
                     </Grid>
                     <Grid item xs={12} >
                        <TextField fullWidth margin="dense"
                        required  multiline
                        id="lastName"
                        label="Last Name" value={this.state.lastName}
                        onChange={this.handleChange("lastName")} />
                       </Grid>
                    <Grid item xs={12} >
                    <TextField  fullWidth margin="dense" required label="Email"
                                id="email"
                                value={this.state.emailId}
                                onChange={this.handleChange("email")}

                    />
                    </Grid>


                    <Grid item xs={12} >
                    <TextField  fullWidth margin="dense" required label="Mobile No"
                                id="mobileNo"
                                value={this.state.mobileNo}
                                onChange={this.handleChange("mobileNo")}

                    />
                    </Grid>
                    {/* <Fab color="primary" aria-label="Add" className="fabStyle">
                        <AddIcon />
                    </Fab>*/}
                   <Grid item xs={12} >

             <Button variant="contained"  type="submit" color="primary" className="btn btn-primary">
                Add
              </Button>
                    </Grid>
                   </Grid>
                </form>

             </Paper>
        )
    }

}
