const DELAY_EACH_ITEM = 10 * 1000
const DELAY_AFTER_READ_ALL_ITEMS = 30 * 1000
const DELAY_AFTER_CLICKED_ITEM = 1 * 1000
const POPUP_APPEAR_TIMER = 1 * 1000
 
 
async function delay(ms=1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function currentDatetime() {
  d=new Date()
  return d.toISOString()
}

function closeModal(text) {
  const modalConfirmBtn=document.getElementsByClassName('plain-button short undefined')[0]
  
  if (modalConfirmBtn && modalConfirmBtn.innerText.toLowerCase() === 'ok') {
    console.log(text);
    modalConfirmBtn.click();
  }
}

async function claim(itemName) {
  const claimBtn=document.getElementsByClassName('button-section set-height')[0]

  if (claimBtn && claimBtn.innerText.toLowerCase() === 'mine') {
    claimBtn.click();
    console.log(`Mined ${itemName} at ${currentDatetime()}`)
    
    await delay(POPUP_APPEAR_TIMER)
    
    closeModal(`You already mined ${itemName}`)
  } else if (claimBtn && claimBtn.innerText.toLowerCase() === 'claimed') {
    claimBtn.click();
    console.log(`!! Claimed ${itemName} at ${currentDatetime()}`)
    
    await delay(POPUP_APPEAR_TIMER)
    
    closeModal(`You got new ${itemName}!`)
  }
}


while(true) {
  const itemsElm=document.querySelector("section.vertical-carousel-container")

  if (itemsElm) {
    const items=itemsElm.children
    
    for (item of items) {
      item.click()
      await delay(DELAY_AFTER_CLICKED_ITEM)
      
      const itemName = document.querySelector("div.info-title-name").innerText
      
      await claim(itemName)
      await delay(DELAY_EACH_ITEM)
    }
  }

  await delay(DELAY_AFTER_READ_ALL_ITEMS)
}
