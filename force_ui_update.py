import re

with open('js/ui.js', 'r', encoding='utf-8') as f:
    ui = f.read()

# The regex to match planetasInfoData and its contents
# It starts at `const planetasInfoData = {` and ends before `function initUI() {`
pattern = r'const planetasInfoData = \{.*?\};\n\n\nfunction initUI\(\) \{'

new_data = """const cosmosInfoData = {
  mercurio: {
    nombre: { es: "Mercurio", en: "Mercury" },
    img: "img/mercurio.jpg",
    desc: { 
      es: "<p>Mercurio es el planeta más pequeño del sistema solar y el más cercano al Sol. No tiene lunas ni anillos, y su superficie está llena de cráteres, similar a la Luna terrestre.</p>", 
      en: "<p>Mercury is the smallest planet in the solar system and the closest to the Sun. It has no moons or rings, and its surface is heavily cratered, similar to Earth's Moon.</p>" 
    }
  },
  venus: {
    nombre: { es: "Venus", en: "Venus" },
    img: "img/venus.jpg",
    desc: { 
      es: "<p>Venus es el planeta más caliente del sistema solar debido a su densa atmósfera de dióxido de carbono, que provoca un efecto invernadero extremo. Gira en dirección contraria a la mayoría de los planetas.</p>", 
      en: "<p>Venus is the hottest planet in the solar system due to its dense carbon dioxide atmosphere, which causes an extreme greenhouse effect. It spins in the opposite direction to most planets.</p>" 
    }
  },
  tierra: {
    nombre: { es: "Tierra", en: "Earth" },
    img: "img/tierra.jpg",
    desc: { 
      es: "<p>Nuestro hogar, la Tierra, es el único planeta conocido que alberga vida. Más del 70% de su superficie está cubierta de agua líquida.</p>", 
      en: "<p>Our home, Earth, is the only known planet to harbor life. More than 70% of its surface is covered in liquid water.</p>" 
    }
  },
  marte: {
    nombre: { es: "Marte", en: "Mars" },
    img: "img/marte.jpg",
    desc: { 
      es: "<p>Marte es conocido como el Planeta Rojo por el óxido de hierro en su superficie. Alberga el Monte Olimpo, el volcán más grande conocido en el sistema solar.</p>", 
      en: "<p>Mars is known as the Red Planet because of the iron oxide on its surface. It hosts Olympus Mons, the largest known volcano in the solar system.</p>" 
    }
  },
  jupiter: {
    nombre: { es: "Júpiter", en: "Jupiter" },
    img: "img/jupiter.jpg",
    desc: { 
      es: "<p>Júpiter es un gigante gaseoso y el planeta más grande de nuestro sistema. Su icónica Gran Mancha Roja es una tormenta gigante que lleva activa siglos.</p>", 
      en: "<p>Jupiter is a gas giant and the largest planet in our system. Its iconic Great Red Spot is a giant storm that has been active for centuries.</p>" 
    }
  },
  saturno: {
    nombre: { es: "Saturno", en: "Saturn" },
    img: "img/saturno.jpg",
    desc: { 
      es: "<p>Famoso por su espectacular sistema de anillos compuestos de hielo y roca, Saturno es el segundo planeta más grande y el menos denso del sistema solar.</p>", 
      en: "<p>Famous for its spectacular ring system made of ice and rock, Saturn is the second-largest planet and the least dense in the solar system.</p>" 
    }
  },
  urano: {
    nombre: { es: "Urano", en: "Uranus" },
    img: "img/urano.jpg",
    desc: { 
      es: "<p>Urano es un gigante de hielo que rota de lado, con una inclinación axial extrema, probablemente debido a una colisión masiva en el pasado.</p>", 
      en: "<p>Uranus is an ice giant that rotates on its side, with an extreme axial tilt likely caused by a massive past collision.</p>" 
    }
  },
  neptuno: {
    nombre: { es: "Neptuno", en: "Neptune" },
    img: "img/neptuno.jpg",
    desc: { 
      es: "<p>Neptuno es el planeta más alejado del Sol. Es un mundo oscuro, frío y azotado por vientos supersónicos, siendo el primero descubierto mediante predicciones matemáticas.</p>", 
      en: "<p>Neptune is the farthest planet from the Sun. It is a dark, cold world whipped by supersonic winds, and was the first planet discovered through mathematical predictions.</p>" 
    }
  },
  
  // GALAXIAS
  espiral: {
    nombre: { es: "Galaxia Espiral", en: "Spiral Galaxy" },
    img: "img/galaxia-espiral.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Espirales</strong> tienen un disco plano giratorio con un bulto central y brazos espirales repletos de gas interestelar, polvo y estrellas jóvenes brillantes.</p>", 
      en: "<p><strong>Spiral Galaxies</strong> have a flat, spinning disk with a central bulge and spiral arms packed with interstellar gas, dust, and bright young stars.</p>" 
    }
  },
  eliptica: {
    nombre: { es: "Galaxia Elíptica", en: "Elliptical Galaxy" },
    img: "img/galaxia-eliptica.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Elípticas</strong> tienen forma de huevo a esférica, contienen principalmente estrellas viejas y tienen muy poco gas y polvo, por lo que rara vez forman nuevas estrellas.</p>", 
      en: "<p><strong>Elliptical Galaxies</strong> are egg-shaped to spherical, contain mostly older stars, and have very little gas and dust, so they rarely form new stars.</p>" 
    }
  },
  irregular: {
    nombre: { es: "Galaxia Irregular", en: "Irregular Galaxy" },
    img: "img/galaxia-irregular.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Irregulares</strong> carecen de forma simétrica. Suelen ser el resultado de intensas perturbaciones gravitacionales o fusiones caóticas de otras galaxias.</p>", 
      en: "<p><strong>Irregular Galaxies</strong> lack a symmetrical shape. They are usually the result of intense gravitational disturbances or chaotic mergers of other galaxies.</p>" 
    }
  },
  lenticular: {
    nombre: { es: "Galaxia Lenticular", en: "Lenticular Galaxy" },
    img: "img/galaxia-lenticular.jpg",
    desc: { 
      es: "<p>Las <strong>Galaxias Lenticulares</strong> son una transición entre espirales y elípticas. Tienen un disco pero carecen de brazos definidos y han perdido gran parte de su materia interestelar.</p>", 
      en: "<p><strong>Lenticular Galaxies</strong> are a transition between spirals and ellipticals. They have a disk but lack defined arms and have lost much of their interstellar matter.</p>" 
    }
  },
  
  // NEBULOSAS
  neb_cangrejo: {
    nombre: { es: "Nebulosa del Cangrejo", en: "Crab Nebula" },
    img: "img/nebulosa.jpg",
    desc: { 
      es: "<p>La <strong>Nebulosa del Cangrejo</strong> es un remanente de supernova, la brillante explosión de una estrella masiva observada por astrónomos chinos en el año 1054.</p>", 
      en: "<p>The <strong>Crab Nebula</strong> is a supernova remnant, the bright explosion of a massive star observed by Chinese astronomers in the year 1054.</p>" 
    }
  },
  neb_pilares: {
    nombre: { es: "Pilares de la Creación", en: "Pillars of Creation" },
    img: "img/pilares.avif",
    desc: { 
      es: "<p>Ubicados en la Nebulosa del Águila, los <strong>Pilares de la Creación</strong> son gigantescas columnas de hidrógeno interestelar frío y polvo donde se están formando nuevas estrellas.</p>", 
      en: "<p>Located in the Eagle Nebula, the <strong>Pillars of Creation</strong> are giant columns of cold interstellar hydrogen gas and dust where new stars are forming.</p>" 
    }
  },
  neb_orion: {
    nombre: { es: "Nebulosa de Orión", en: "Orion Nebula" },
    img: "img/orion.jpg",
    desc: { 
      es: "<p>La <strong>Nebulosa de Orión (M42)</strong> es una región de formación estelar masiva visible a simple vista. Es la cuna estelar densa más cercana a nuestro planeta.</p>", 
      en: "<p>The <strong>Orion Nebula (M42)</strong> is a massive star-forming region visible to the naked eye. It is the closest region of massive star formation to Earth.</p>" 
    }
  },
  neb_eta: {
    nombre: { es: "Eta Carinae", en: "Eta Carinae" },
    img: "img/eta.webp",
    desc: { 
      es: "<p><strong>Eta Carinae</strong> es un sistema estelar hipermasivo que experimentó una Gran Erupción en el siglo XIX, creando la Nebulosa del Homúnculo bipolar que lo rodea.</p>", 
      en: "<p><strong>Eta Carinae</strong> is a hypermassive star system that experienced a Great Eruption in the 19th century, creating the bipolar Homunculus Nebula around it.</p>" 
    }
  },
  neb_hubble: {
    nombre: { es: "Campo Profundo", en: "Deep Field" },
    img: "img/campo.jpg",
    desc: { 
      es: "<p>El <strong>Campo Ultra Profundo del Hubble</strong> revela miles de galaxias de diversas edades y tamaños, algunas de cuando el universo tenía apenas cientos de millones de años.</p>", 
      en: "<p>The <strong>Hubble Ultra Deep Field</strong> reveals thousands of galaxies of various ages and sizes, some from when the universe was only hundreds of millions of years old.</p>" 
    }
  },
  neb_planetaria: {
    nombre: { es: "Nebulosa Planetaria", en: "Planetary Nebula" },
    img: "img/planetaria.jpg",
    desc: { 
      es: "<p>Una <strong>Nebulosa Planetaria</strong> marca el hermoso final de una estrella similar al Sol, expulsando sus capas gaseosas exteriores mientras su núcleo brillante se encoge y enfría.</p>", 
      en: "<p>A <strong>Planetary Nebula</strong> marks the beautiful end of a Sun-like star, expelling its outer gaseous layers while its glowing core shrinks and cools.</p>" 
    }
  },
  
  // CONSTELACIONES
  const_orion: {
    nombre: { es: "Orión", en: "Orion" },
    img: "img/constelacion-orion.jpg",
    desc: { 
      es: "<p><strong>Orión</strong> (el cazador) es una de las constelaciones más prominentes y reconocibles, dominada por el Cinturón de Orión de tres estrellas alineadas.</p>", 
      en: "<p><strong>Orion</strong> (the hunter) is one of the most prominent and recognizable constellations, dominated by the three aligned stars of Orion's Belt.</p>" 
    }
  },
  const_osa: {
    nombre: { es: "Osa Mayor", en: "Ursa Major" },
    img: "img/osa-mayor.jpg",
    desc: { 
      es: "<p>La <strong>Osa Mayor</strong> contiene el famoso asterismo de 'El Carro' o 'El Cazo'. Es una constelación circumpolar clave para la navegación en el hemisferio norte.</p>", 
      en: "<p><strong>Ursa Major</strong> contains the famous asterism the 'Big Dipper'. It is a circumpolar constellation essential for navigation in the Northern Hemisphere.</p>" 
    }
  },
  const_casiopea: {
    nombre: { es: "Casiopea", en: "Cassiopeia" },
    img: "img/casiopea.webp",
    desc: { 
      es: "<p><strong>Casiopea</strong> tiene la inconfundible forma de una letra 'W' o 'M' y en la mitología griega representa a una reina vanidosa atada a su trono.</p>", 
      en: "<p><strong>Cassiopeia</strong> has the unmistakable shape of a 'W' or 'M' and in Greek mythology represents a vain queen tied to her throne.</p>" 
    }
  },
  const_cisne: {
    nombre: { es: "Cisne", en: "Cygnus" },
    img: "img/cisne.webp",
    desc: { 
      es: "<p><strong>El Cisne</strong> es fácil de hallar en verano gracias al asterismo de la 'Cruz del Norte' y su estrella supergigante blanca, Deneb.</p>", 
      en: "<p><strong>Cygnus</strong> (the swan) is easy to spot in summer thanks to the 'Northern Cross' asterism and its white supergiant star, Deneb.</p>" 
    }
  }
};

function initUI() {"""

ui = re.sub(pattern, new_data, ui, flags=re.DOTALL)

ui = ui.replace("const data = typeof planetasInfoData !== 'undefined' ? planetasInfoData[planetaKey] : null;", "const data = typeof cosmosInfoData !== 'undefined' ? cosmosInfoData[planetaKey] : null;")

with open('js/ui.js', 'w', encoding='utf-8') as f:
    f.write(ui)

print("SUCCESS")
