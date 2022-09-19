const puppeteer = require('puppeteer');


(async () => {
    //detrmina el buscador
    const browser = await puppeteer.launch({ headless: false });
    //me permite ingresar a nuevas paginas
    const page = await browser.newPage();
    //interactuar con diferentes paginas
    await page.goto('https://www.falabella.com/falabella-cl');
    //consigue una screenshot de la direccion
    //await page.screenshot({ path: 'falabella1.jpg' });
    //ingresamos el id del input y le pasamos la busqueda que queremos.
    await page.type('#testId-SearchBar-Input','notebook gamer');
    //screenshot de la busqueda
    //await page.screenshot({ path: 'falabella2.jpg' });
    //ahora selecciono el el div que contiene al input o button, tomo su selector e indico donde haga click
    await page.click('.SearchBar-module_searchBarWrapper__FWM7Z button');
    // espero hasta que salga un selector que este en toda la pagina
    await page.waitForSelector(`.search-results-2-grid`);
    //hago screenshot de la busqueda.
    //await page.screenshot({ path: 'falabella3.jpg' });
    //dar un tiempo
    //funcion anonima que inspecciona la pagina con js nativo.
    const enlaces = await page.evaluate(() =>{
        const elements = document.querySelectorAll('.search-results-2-grid div .pod-details-2_GRID a')
        const links =[];
        for (let element of elements){ 
            links.push(element.href)
        }return links
    });
    const listas=[];
    for(let enlace of enlaces){
        await page.goto(enlace);

        const lista =  await page.evaluate(() =>{
            const tmp ={};
            tmp.title = document.querySelector('.product-name').innerText;
            tmp.price = document.querySelector('.copy12').innerText;
            return tmp;
        });
        listas.push(lista)
    }
   
    console.log(listas);
    await browser.close();

})();