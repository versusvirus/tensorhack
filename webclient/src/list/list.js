import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {notes, calculate} from 'tensorhackfetchapi';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { styled } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Avatar from '@material-ui/core/Avatar';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import DehazeIcon from '@material-ui/icons/Dehaze';


const STextField = styled(TextField)({
          marginLeft: '8px',
          marginRight: '8px',
          width: 200,
        
})

const SList = styled(List)({
    width: '100%',
    maxWidth: 760,
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 700,
  })



 // const classes = useStyles();

function getList() {
    return notes.getNotes();
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

class TodoList extends React.Component {
    list: [11,22]

    constructor(props) {
        super(props);
        this.state = {
            goods: [{
                _id: 1,
                name: 'молоко'
            }, {
                _id: 2,
                name: 'хлеб'
            }, {
                _id: 3,
                name: 'патроны'
            }, {
                _id: 4,
                name: 'грибы'
            }],
            newValue: '',
            open:false,
            purchases: [{
                "_id": "33e333",
                "shop": "Пятерочка",
                "products": [{
                    "_id": "5dcee5601c9d44000067f295",
                    "shop": "Пятерочка",
                    "price": "53,99",
                    "stockprice": "89,50",
                    "name": 'Молоко "Домик в деревне"',
                    "img" : "https://leonardo.edadeal.io/dyn/re/items/248/orig/6072e0b3.jpg",
                    "characteristics": ["0,9л", "3.2%", "59,98 ₽/л"],
                    "count":2,
                    "unit":"бут"
                }, {
                    "_id": "5dcee59b1c9d44000067f299",
                    "shop": "Пятерочка",
                    "price": "69,90",
                    "stockprice": "84,90",
                    "name": 'Яйцо столовое "Дедушкины яйца"',
                    "img" : "https://leonardo.edadeal.io/dyn/re/items/19/orig/ec9b9cff.jpg",
                    "characteristics": ["10шт", "отборное", "6,99 ₽/шт"],
                    "count":1,
                    "unit":"уп"
                }]
            }]        };
        this.onAddHandler = this.onAddHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        calculate.calculate('5dd2c7d29fce9500176d67b6').then((data) => {
            this.setState({
            //    purchases: data
            })
        });
        getList().then((data) => {
            this.setState({
                goods: data
            })
        })
    }

    onAddHandler() {
        this.setState({
            open:true
        })

        let good = {
            name: this.state.newValue,
            user: 123,
            date: new Date()
        }
        notes.createNote(good)
            .then(({_id}) => {
                this.setState({
                    goods: [...this.state.goods, {_id, ...good}],
                    newValue: ''
                })
            });
    }

    onRemoveHandler(_id) {
        notes.deleteNote(_id)
            .then(() => {
                this.setState({
                    goods: this.state.goods.filter(good => {
                        return good._id != _id;
                    })
                })
            });
    }

    onKeyDownHandler(e) {
        if (e.keyCode == 13) {
            this.onAddHandler();
        }
    }

    handleChange(event) {
        this.setState({newValue: event.target.value});
    }

    selectedValue(event){

    }
    handleClose(event){
        this.setState({
            open:false,
            
        })
    }

    render() {
        const ulstyle = {margin:'0px', padding:'0px'};
        const avatarstyle = {width:'60px', height:'60px'};
    
        return (
            <div>

                <div class="d-flex flex-wrap">

                <Button onClick={this.onAddHandler} variant="contained" className="button" style={{width:"100%"}}>Добавить продукт</Button>
                <SimpleDialog selectedValue={null} open={this.state.open} onClose={this.handleClose} />
                
                </div>
                <SList subheader={<li />}>
                     {this.state.purchases.map(purchase => (
        <li key={`section-${purchase.shop}`} className={''}>
          <ul className={'classes.ul'} style={ulstyle}>
            <ListSubheader style={{"text-align": "left", "lin11e-height": "32px", "background-color":"rgb(245,245, 245)"}}>
                {`${purchase.shop}`}
                <span style={{color:"rgba(127, 127, 127, 0.54)"}}> 145  ₽</span>
            </ListSubheader>
            
            {purchase.products.map(product => (
              <ListItem key={`item-${purchase.shop}-${product._id}`}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={product.img} variant="rounded" style={avatarstyle}/>
                </ListItemAvatar>
                <ListItemText
                    primary={`${product.name}`} 
                    secondary={
                        <React.Fragment>
                        {product.characteristics.map(characteristic => (
                            <span className="item-characteristic">{characteristic}</span>
                        ))}
                        <div>
                            <span className="item-price">{product.price} &#8381;</span>
                            <span className="item-stockprice">{product.stockprice} &#8381;</span>
                            <div style={{float:"right"}}>{product.count} {product.unit}</div>
                        </div>
                        </React.Fragment>
                    }
                />
              </ListItem>
            ))}
            <ListItem>
                <ListItemText primary={
                    <React.Fragment>
                        Итого: <span style={{"font-size":"24px"}}>1234.66 ₽</span>
                    </React.Fragment>
                    }></ListItemText>
            </ListItem>
          </ul>
        </li>
      ))}
    </SList>
    <div style={{"text-align":"left", float:"left"}}>
    <FormControlLabel 
        control={
        <Checkbox
        /*checked={state.checkedA}
        onChange={handleChange('checkedA')}
       */ value="checkedA"
        inputProps={{
          'aria-label': 'primary checkbox',
        }}></Checkbox>
        }
        label="В одном магазине"
      />

    </div>
    <Fab color="primary" aria-label="add" size="small" style={{float:"right"}}>
        <DehazeIcon />
      </Fab>

   </div>
        );
    }
}

export default TodoList;



const goods = ['молоко', 'хлеб', 'макароны', 'чай', 'рис'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});




function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const [newValue, setNewValue] = useState('');
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = value => {
      onClose(value);
    };
    const handleChange = event => {
        setNewValue(event.target.value)
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <STextField
                    value={newValue}
                    onChange={handleChange}
                  /*  onKeyDown={e => {
                        this.onKeyDownHandler(e)
                    }}*/
                    id="filled-basic"
                    className="textField"
                    label="Filled"
                    margin="normal"
                    variant="filled"
          
                />
        <List>
          {goods.filter(item => {return item.includes(newValue)}).map(item => (
            <ListItem button onClick={() => handleListItemClick(item)} key={item}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };