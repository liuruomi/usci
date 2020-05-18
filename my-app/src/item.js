import React , {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useRouteMatch as match, useParams} from 'react-router-dom';
import logo from './white.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
const log = console.log
const useStyles = theme =>({
              root: {
                maxWidth: 345,
                display: 'inline-block',
                marginTop: 80,
              },
            });

class item extends Component{
    constructor(){
        super()
        this.state= {
            prod:{}
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    async componentDidMount(){
        let name = this.props.match.params.topicId
        log(name)
        const url = '/product/'+name

        const request = await fetch(url);
        const response = await request.json();
        this.setState({
            prod: response
        })
    }

    handleDelete(){
        let name = this.props.match.params.topicId
        log(name)
        const url = '/product/'+name
        const requestOptions = {
            method: 'DELETE'
          };

          // Note: I'm using arrow functions inside the `.fetch()` method.
          // This makes it so you don't have to bind component functions like `setState`
          // to the component.
          fetch(url, requestOptions).then((response) => {
            return response.json();
          }).then((result) => {
            // do what you want with the response here
          });

        let path = './';
        // let history = useHistory();
        this.props.history.push(path);
    }
    render(){
        const { classes } = this.props;
        // let { topicId } = useParams()
        let prod = this.state.prod.product_id

        log(prod)
        if(prod){
        return(
            <div style={{'textAlign':'center'}}>

            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={`${prod.product_name}`}
                  height="140"
                  image= {logo}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {prod.product_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <div>
                    Product Name: {prod.product_name}
                    </div>
                    <div>
                    Current Price: {prod.current_price}
                    </div>
                    <div>
                    Current Stock Level: {prod.stock}
                    </div>
                    <div>
                    Last Updated Time: {prod.time}
                    </div>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick = {this.handleDelete} >
                  Delete
                </Button>
              </CardActions>
            </Card>
    </div>
            )
        } else {
            return(
                <div>
                ...loading
                </div>
                )
        }
    }
}

item.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(item);
