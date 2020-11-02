// Create page with elements to display customer dbase
function createPage() {
    const body = document.querySelector('body')
    let container = createElement('div', ['main'])

    let h2 = document.createElement('h2', ['h2'])
    h2.textContent = "Momentum Learning C7 Customer Database"
    body.appendChild(h2)

    for (let customer of customers) {
        container.appendChild(createCard(customer))
    }
    body.appendChild(container)
}

createPage()

// Helper function to manage elements as string and array of strings
function createElement(type, classList) {
    let element = document.createElement(type)
    for (let item of classList) {
        element.classList.add(item)
    }
    return element
}

// innerHTML to manage addresses
function createTextElem(type, classList, innerHTML) {
    let elem = createElement(type, classList)
    elem.innerHTML = innerHTML
    return elem
}

// returns a string with inish cap
function capitalize(string) {
    if (string.length === 1) {
        return string[0].toUpperCase()
    }
    else {
        return string[0].toUpperCase() + string.slice(1)
    }
}

// returns a array with inish cap
function capitalizeArray(arr) {
    return arr.map((string) => { return capitalize(string) })
}

// functions using customer objects from customers array in customers.js
function customerName(customer) {
    let components = [customer['name'].first, customer['name'].last]
    components = capitalizeArray(components)
    return components.join(' ')
}

function customerLocation(customer) {
    let splitStreet = customer.location.street.split(' ')
    let splitCity = customer.location.city.split(' ')

    let street = capitalizeArray(splitStreet).join(' ')
    let city = capitalizeArray(splitCity).join(' ')
    let state = nameToAbbr(customer.location.state)
    let postcode = customer.location.postcode

    return `${street}` + '<br>' + `${city}, ${state} ${postcode}`
}

function customerSince(customer) {
    let reg = customer.registered.slice(0, 10)
    let regDate = moment(reg).format('MMM D, YYYY')
    return `Customer since: ${regDate}`
}

// create customer card elements
function createCard(customer) {
    const card = createElement('div', ['card', 'flex'])

    const img = createElement('img', ['face'])
    img.src = customer.picture.large
    img.alt = `Profile picture of ${customerName(customer)}`

    let components = [
        createTextElem('p', ['name'], customerName(customer)),
        createTextElem('p', ['location'], customerLocation(customer)),
        createTextElem('p', ['cell'], customer.cell),
        createTextElem('p', ['email'], customer.email),
        createTextElem('p', ['reg'], customerSince(customer))
    ]

    card.appendChild(img)

    for (let component of components) {
        card.appendChild(component)
    }
    return card
}
