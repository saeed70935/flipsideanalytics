const useQueryWithReplacedString = (Query:string,Param:string,NewValue:string)=>{
   return Query.replaceAll(Param, NewValue);
}
export default useQueryWithReplacedString