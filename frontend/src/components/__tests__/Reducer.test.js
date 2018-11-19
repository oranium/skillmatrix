import reducer from '../../reducers';

const defaultFormState = {
    textfield: {
        name: "Skill",
        value: "",
        error: false
    },
    levelfield: {
        name: "Level",
        value: "",
        error: false
    },
    datefield: {
        name: "Date",
        value: "",
        error: false
    },
    textarea: {
        name: "Note",
        value: "",
        error: false
    },
};
const exampleFormState = {
    formState:{
    textfield: {
        name: "Skill",
        value: "Valdemar",
        error: false
    },
    levelfield: {
        name: "Level",
        value: "4",
        error: false
    },
    datefield: {
        name: "Date",
        value: "11/11/2011",
        error: false
    },
    textarea: {
        name: "Note",
        value: "5",
        error: false
    }
},
page:"form",
user:"Valdemar"
};


describe('reducer tests', () => {
   
   //test default case
    it('reducer should return the same state again (switch(default)', () => {
      
        var actState = reducer(exampleFormState, 'default');
        expect(actState['formState']).toEqual(exampleFormState['formState']);

      });
      

    //test reset
      it('should return an empty form after: \"RESETFORM \"', () => {


       var actState = reducer(exampleFormState,{
                                                type: "RESETFORM",
                                                } );

       expect(actState['formState']).toEqual(defaultFormState);

      });

      //test error state
      it('should return the Errorpage state after Event \"SETERROR\"', () => {


        var errorState = reducer(exampleFormState,{
                                            type: "SETERROR",
                                            id: 1,
                                            error: "server timeout" 
                                            });

        expect({"error": "server timeout"}).toEqual(errorState['formState']['1']);

      });

      it('should update the actual state after Event \"UPDATEINPUT\"', () => {

        //test for empty input redundant bc its done by material-ui component <Input/>

        var actState = reducer(exampleFormState, {
                                                    type: "UPDATEINPUT",
                                                    id: "email",
                                                    input: "123@gmx.de"
                                                    }
                                                    );

        expect({"value": "123@gmx.de"}).toEqual(actState['formState']['email']);

      });


      //changes the state --> update page
      it('should return the next page', () => {
          var actState = reducer(exampleFormState,{
            type: "SWITCHPAGE",
            page: 'login'
        });
        expect("login").toEqual(actState['page']);
      });
      //update username
       it('should update the name in the state', () => {
         var actState = reducer(exampleFormState,{
           type: "UPDATEUSERNAME",
           user: 'Vladimir'
       });
       expect("Vladimir").toEqual(actState['user']);
     });

     it('set errorMsg right', () => {
        var actState = reducer(exampleFormState,{
          type: "SETLOGINERROR",
          errorMsg: "server timeout"
      });
      
      expect("server timeout").toEqual(actState['errorMsg']);
    });
});
