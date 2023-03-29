import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    right: 10,
    alignSelf: 'flex-start',
    width: 365,
    borderBottomColor: 'grey',
    borderWidth: 0.6,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderRightColor: "#1b1b1b",
    borderTopColor: '#1b1b1b',
    


    
    
    

  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: '#3777f0',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 55,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },          

  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
    color: 'white'
  },
  text: {
    color: '#e5e5e5',
  }
});

export default styles;