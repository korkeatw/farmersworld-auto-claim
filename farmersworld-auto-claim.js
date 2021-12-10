const DELAY_EACH_ITEM = 20 * 1000
const DELAY_AFTER_READ_ALL_ITEMS = 30 * 1000
const DELAY_AFTER_CLICKED_ITEM = 1 * 1000
const POPUP_APPEAR_TIMER = 1 * 1000
const ENERGY_THRESHOLD_PERCENT = 60
const ITEM_DURABILITY_THRESHOLD_PERCENT = 50

 
async function delay(ms=1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function currentDatetime() {
  d=new Date()
  return d.toISOString()
}

function percentage(a, b) {
  return parseFloat(((a/b)*100).toFixed(2))
}

function closeModal(text) {
  const modalConfirmBtn = document.getElementsByClassName('plain-button short undefined')[0]
  
  if (modalConfirmBtn && modalConfirmBtn.innerText.toUpperCase() === 'OK') {
    console.log(text);
    modalConfirmBtn.click();
  }
}

async function mine(itemName) {
  const btn = document.getElementsByClassName('button-section set-height')[0]

  if (btn && btn.innerText === 'Mine') {
    btn.click();
    console.log(`Mined ${itemName} at ${currentDatetime()}`)
    
    await delay(POPUP_APPEAR_TIMER)
    
    closeModal(`You already mined ${itemName}`)
  }
}

async function claim(itemName) {
  const btn = document.getElementsByClassName('button-section set-height')[0]

  if (btn && btn.innerText === 'Claim') {
    btn.click();
    console.log(`!! Claimed ${itemName} at ${currentDatetime()}`)
    
    await delay(POPUP_APPEAR_TIMER)
    
    closeModal(`You got new ${itemName}!`)
  }
}

async function repair(itemName) {
  const activeButtons = document.getElementsByClassName('button-section set-height')
  const repairButtonIsActive = activeButtons.length === 2 && activeButtons[1].innerText === 'Repair'

  if (repairButtonIsActive) {
    const itemDurabilityNumbers = document.querySelector('.card-number').innerText.split('/ ')
    const itemDurabilityPercent = percentage(itemDurabilityNumbers[0], itemDurabilityNumbers[1])
    const shouldRepair = itemDurabilityPercent < ITEM_DURABILITY_THRESHOLD_PERCENT

    if (shouldRepair) {
      activeButtons[1].click()

      console.log(`Item "${itemName}" was repaired at ${currentDatetime()}`)
    }
  }
}

async function rechargeEnergy() {
  const resources = document.querySelectorAll(".resource__group")

  if (resources.length) {
    const energyNumbers = resources[3].innerText.split('\n/')
    const remainEnergyPercent = percentage(energyNumbers[0], energyNumbers[1])
    
    // if energy lower than theshold, fill it
    if (remainEnergyPercent < ENERGY_THRESHOLD_PERCENT) {
      console.log(`Remain energy is lower than threshold: ${remainEnergyPercent}%`)
      console.log('Filling the energy ...')

      // click + to add energy
      document.querySelector('.resource-energy--plus').click()
      await delay(2000)


      // increase energy number to be filled, find and click exchange button
      do {
        var energyValue = document.querySelector(".modal-input").value
        document.querySelector("img[alt='Plus Icon']").click()
      } while (energyValue != document.querySelector(".modal-input").value)

      Array.from(document.querySelectorAll("div.plain-button"))
        .find(elm => elm.textContent == 'Exchange').click()
    } else {
      console.log('Energy is equal or greater than threshold. Do nothing!')
    }
  }
} 


while(true) {
  const itemsElm=document.querySelector("section.vertical-carousel-container")

  if (itemsElm) {
    const items=itemsElm.children
    
    for (item of items) {
      await rechargeEnergy()

      item.click()
      await delay(DELAY_AFTER_CLICKED_ITEM)
      
      const itemName = document.querySelector("div.info-title-name").innerText
      
      await repair(itemName)
      await mine(itemName)
      await claim(itemName)
      await delay(DELAY_EACH_ITEM)
    }
  }

  await delay(DELAY_AFTER_READ_ALL_ITEMS)
}
