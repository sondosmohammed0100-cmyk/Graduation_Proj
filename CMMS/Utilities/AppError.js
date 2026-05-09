class AppError extends Error{
  constructor(message,stCode){

    super(message)
    this.stCode=stCode;
  } 
};
module.exports= AppError
