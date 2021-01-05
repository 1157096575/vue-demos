import store from 'store/index';
const getMenuAndButton = store.getters.getMenuAndButton || [];
const judgeMenuAndButton = (id) => {
    //console.log(getMenuAndButton,id);
    //console.log(id);
    if(getMenuAndButton && getMenuAndButton.length > 0) {
        for(var i = 0; i < getMenuAndButton.length; i++){
            if (getMenuAndButton[i] == id){
                //console.log('true',id);
                return true;
            }
        }
        return false;
    }
    return false;
};
export default judgeMenuAndButton;