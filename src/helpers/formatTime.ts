const formatTime = (timeStamp: number) : any => {
  const calculatedTime = Date.now() - timeStamp;
  if((((calculatedTime / 1000) / 60) / 60) / 24 > 1) {
    return `${Math.round((((calculatedTime / 1000) / 60) / 60) / 24)} d`
  } else if(((calculatedTime / 1000) / 60) > 60 ) {
    return `${Math.round(((calculatedTime / 1000) / 60) / 60)} hr`
  } else if((calculatedTime / 1000) > 60) {
    return `${Math.round((calculatedTime / 1000) / 60 )} min`;
  } else {
    return `${Math.round(calculatedTime / 1000)} s`;
  }  
}

export default formatTime;