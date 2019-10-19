import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
//import Fab from '@material-ui/core/Fab';
//import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import './vehicle.css'
import * as vehicleAction from '../reduxcontainer/actions/vehicleAction';
import { connect } from 'react-redux';
class Vehicle extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            engineNo:0,
            regNo: '',
            model: '',
            regDate:'',
            color:0,
        }

    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };
    submit=(e)=>{
        e.preventDefault();
        //console.log(this.state.cust);
        const obj = {
            engineNo: this.state.engineNo,
            regNo: this.state.regNo,
            model: this.state.model,
            regDate:this.state.regDate,
            color:this.state.color
        };
        console.log(obj);

        this.props.createVehicle(obj);

        //this.props.history.push('/Solutions');

    }

    listView(data, index){
        return (
           /* <div className="row">
            <div className="col-md-10">
            <li key={index} className="list-group-item clearfix">
            {data.regNo}
            </li>
            </div>
            <div className="col-md-2">
            <button onClick={(e) => this.deleteVehicle(e, index)} className="btn btn-danger">
            Remove
            </button>
            </div>
            </div>*/

            <List key={data.regNo} style={{ backgroundColor: ' #b31aff'}}>
            <ListItem>
            <ListItemAvatar>
            <Avatar>
            <BeachAccessIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data.regNo} secondary={data.model} />
        <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={(e) => this.deleteVehicle(e, data.regNo)}>
            <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
            </ListItem>
            </List>
    )
    }

    deleteVehicle(e, index){
        e.preventDefault();
        console.log(index);
        this.props.deleteVehicle(index);
    }


    render()
    {
        return(
            <Paper className="vpaper" style={{ backgroundColor: ' #f7e6ff', height: '30vh' }} >

            <Typography variant="h6" color="inherit">
        Vehicle Details
    </Typography>


    <form onSubmit={this.submit} style={{ backgroundColor: ' #f7e6ff', height: '30vh' }} >
        <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
        <TextField fullWidth margin="dense"
        id="engineNo"
        required label="Engine No"
        value={this.state.engineNo}
        onChange={this.handleChange("engineNo")}
        />
        </Grid>

        <Grid item xs={12} sm={4} >
        <TextField  fullWidth margin="dense" required label="Registration No"
        id="regNo"
        value={this.state.regNo}
        onChange={this.handleChange("regNo")}
        />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField fullWidth margin="dense"
        required  multiline
        id="model"
        label="Model" value={this.state.model}
        onChange={this.handleChange("model")} />
    </Grid>
    <Grid item xs={12} sm={4}>
        <TextField type="date" fullWidth margin="dense" required label="Reg Date"
        id="regDate"
        value={this.state.regDate}
        onChange={this.handleChange("regDate")}
        InputLabelProps={{
        shrink: true,
    }}
        />
        </Grid>


        <Grid item xs={12} sm={4}>
        <TextField  fullWidth margin="dense" required label="Color"
        id="color"
        value={this.state.color}
        onChange={this.handleChange("color")}

        />
        </Grid>
        {/* <Fab color="primary" aria-label="Add" className="fabStyle">
                        <AddIcon />
                    </Fab>*/}
    <Grid item xs={12} sm={4}>

        <Button variant="contained"  type="submit" color="secondary" className="btn btn-primary">
        Add
        </Button>
        </Grid>
        </Grid>
        </form>
        { <ul className="list-group">
            {this.props.vehicles.map((vehicle, i) => this.listView(vehicle, i))}
            </ul> }
        </Paper>
    )
    }

}

        const mapStateToProps = (state, ownProps) => {
            return {
                vehicles: state.vehicles
            }
        };

        const mapDispatchToProps = (dispatch) => {
            return {
                createVehicle: vehicle => dispatch(vehicleAction.createVehicle(vehicle)),
                deleteVehicle: index =>dispatch(vehicleAction.deleteVehicle(index))
            }
        };

        export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
