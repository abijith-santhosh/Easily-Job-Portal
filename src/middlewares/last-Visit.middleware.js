//setting a cookeie for 3 days to track user last visit
export const setLastVisit =(req,res,next)=>{
    if(req.cookies.lastVisit){
res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString()
    }

    res.cookie('lastVisit',new Date().toISOString(),{
        maxAge:3*24*60*60*1000,
    });
    next();
}