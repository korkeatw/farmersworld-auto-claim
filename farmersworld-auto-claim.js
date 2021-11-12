const DELAY_EACH_ITEM_SEC = 3 * 1000
const DELAY_AFTER_READ_ALL_ITEMS_SEC = 30 * 1000
const DELAY_AFTER_CLICKED_ITEM_SEC = 0.5 * 100
 
 
async function delay(ms=1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function currentDatetime() {
  d=new Date()
  return d.toISOString()
}

async function claim(itemName) {
  const claimBtn=document.getElementsByClassName('button-section set-height')[0]

  if (claimBtn && claimBtn.innerText === 'Mine') {
    claimButtom.click();
    console.log(`Claimed ${itemName} at ${currentDatetime()}`)
    
    await delay(1000)
    
    const modalConfirmBtn=document.getElementsByClassName('plain-button short undefined')[0]
  
    if (modalConfirmBtn && modalConfirmBtn.innerText === 'OK') {
      console.log(`You got new ${itemName}!`);
      modalConfirmBtn.click();
    }
  }
}


while(true) {
  const items=document.querySelector("section.vertical-carousel-container").children

  for (item of items) {
    item.click()
    await delay(DELAY_AFTER_CLICKED_ITEM_SEC)
    
    const itemName = document.querySelector("div.info-title-name").innerText
    
    await claim(itemName)
    await delay(DELAY_EACH_ITEM_SEC)
  }

  await delay(DELAY_AFTER_READ_ALL_ITEMS_SEC)
}
