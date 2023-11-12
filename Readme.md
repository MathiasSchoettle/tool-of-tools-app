## TODOs:

* Check why modal in monthDayField is being re rendered when opening and closing context menu
* add missing features to input fields 
  * disabled
  * readOnly
  * defaultValue
  * placeholder
  * generic error message (data-error-message already exists in the form hook)
  * other default field values that might exist
* generify onChange handling in input fields
  * if possible find a solution if we want to have an on change listener in addition to the form hook
    * currently the form hook uses the onChange attribute
* form hook
  * currently we are listening to the on change of input fields and immediately update the stored value
    * try and use these values to do immediate validation of the field instead of just on submit
  * we need a way for custom validation like a date should be before another date
  * we need a way to show server side validation error messages
    * or do we? we could also just assume if a server side error is thrown then the client side validation is lacking or someone is trying to meddle with raw post requests
* make styling and validation of inputs more generic, currently all inputs have same styling hard coded