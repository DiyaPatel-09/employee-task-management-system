function StatCard({

    title,

    value

}){

    return(

<div className="dashboard-card">

    <p className="card-title">

        {title}

    </p>

    <h2 className="card-value">

        {value}

    </h2>

</div>

);
}

export default StatCard;