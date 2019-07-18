import React from "react";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity
} from "react-native";

class Source extends React.Component {
static navigationOptions = ({ navigation }) => {
return {
  title: "Source Listing",
  headerStyle: {backgroundColor: "000000"},
  headerTitleStyle: {textAlign: "center",flex: 1}
 };
};
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:[]
  };
}
componentDidMount(){
fetch("https://ghibliapi.herokuapp.com/films")
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson
  })
})
.catch(error=>console.log(error)) 
}
FlatListItemSeparator = () => {
return (
  <View style={{
     height: 20,
     width:"100%",
     backgroundColor:"#E9967A",
}}
/>
);
}
renderItem=(data)=>
<TouchableOpacity style={styles.list}>
<Text style={styles.Text}>{data.item.title}</Text>
<Text style={styles.Text}>{data.item.description}</Text>
<Text style={styles.Text}>Director: {data.item.director}</Text>
<Text style={styles.Text}>Rotten Tomatoes Score: {data.item.rt_score}</Text>
<Text style={styles.lightText}>Year Released: {data.item.release_date}</Text>
</TouchableOpacity>
render(){
 if(this.state.loading){
  return( 
    <View style={styles.loader}> 

      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}
return(
 <View style={styles.container}>
 <FlatList
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
    keyExtractor= {item=>item.id.toString()}
 />
</View>
)}
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#00ffff",
    top:25,
    justifyContent: "space-between",
    position: "absolute"
   },
  loader:{
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff000"
   },
  list:{
    paddingVertical: 4,
    margin: 1.5,
    backgroundColor: "#ffd700"
   }
});

export default Source;
