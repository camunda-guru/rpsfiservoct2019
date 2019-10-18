import React,{Component} from 'react'
import axios from 'axios';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import withStyles from "@material-ui/core/styles/withStyles";
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import './viewrequest.css'
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});


const CustomTableCell=  withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 16
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);



const apiUrl = 'http://visaapp.us-east-1.elasticbeanstalk.com';


class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}
TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

/*const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});*/



export class ViewRequest extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            applications:[],
            page: 0,
            rowsPerPage: 5,
        }
    }


    componentDidMount()
    {

        axios.get(`${apiUrl}/getvisa`)
            .then(response => {
                    console.log(response.data);
                    this.setState({
                        applications: response.data
                    })
                }
            )
            .catch(error => {
                throw(error);
            });
    }


    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };


    deleteVisa(obj)
    {

        axios.get(`${apiUrl}/deletevisabyid/`+obj.applicationNo)
            .then(response => {
                    console.log(response.data);
                   window.location.href='/VisaStatus'
                }
            )
            .catch(error => {
                throw(error);
            });
    }


    render()
    {
      //  const { classes, count,  theme } = this.props;
        const { applications, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.applications.length - page * rowsPerPage);
        return(
            <Paper className="paper">

                        <Typography variant="h6" color="inherit">
                            Online Visa Applications Received
                        </Typography>


                <div >

           <Table >

               <TableHead>
                   <TableRow>
                  <CustomTableCell>
                      Application No
                  </CustomTableCell>
                       <CustomTableCell>
                           First Name
                       </CustomTableCell>
                       <CustomTableCell>
                           Last Name
                       </CustomTableCell>
                       <CustomTableCell>
                           Email
                       </CustomTableCell>
                       <CustomTableCell>
                           Edit
                       </CustomTableCell>
                       <CustomTableCell>
                           Delete
                       </CustomTableCell>
                   </TableRow>
               </TableHead>

               <TableBody>
                   {
                       this.state.applications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(application=>(
                          <TableRow key={application.applicationNo}>
                              <CustomTableCell>
                                  {application.applicationNo}
                              </CustomTableCell>
                               <CustomTableCell>
                                   {application.firstName}
                               </CustomTableCell>
                              <CustomTableCell>
                                  {application.lastName}
                              </CustomTableCell>
                              <CustomTableCell>
                                  {application.email}
                              </CustomTableCell>
                              <CustomTableCell>
                                  <Button>
                                   <EditIcon/>
                                  </Button>
                              </CustomTableCell>
                              <CustomTableCell>
                                  <Button onClick={()=>{this.deleteVisa(application)}}>
                                  <DeleteIcon/>
                                  </Button>
                              </CustomTableCell>

                          </TableRow>

                       ))

                   }
                   {emptyRows > 0 && (
                       <TableRow style={{ height: 48 * emptyRows }}>
                           <TableCell colSpan={6} />
                       </TableRow>
                   )}

               </TableBody>

               <TableFooter>
                   <TableRow>
                       <TablePagination
                           rowsPerPageOptions={[5, 10, 25]}
                           colSpan={3}
                           count={applications.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           SelectProps={{
                               native: true,
                           }}
                           onChangePage={this.handleChangePage}
                           onChangeRowsPerPage={this.handleChangeRowsPerPage}
                           ActionsComponent={TablePaginationActionsWrapped}
                       />
                   </TableRow>
               </TableFooter>


           </Table>
                </div>
            </Paper>
        )
    }
}
