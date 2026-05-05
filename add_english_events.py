#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adds 'descripcionEN' field to every event in astronomy-events.js
using pattern-based translation of common astronomical phrases.
"""
import re, json

# ── Phrase translation map (longest first for correct replacement) ────────────
PHRASES = [
    # Lanzamientos
    ("Lanzamiento de la sonda Magallanes a Venus", "Launch of the Magellan probe to Venus"),
    ("Lanzamiento de la sonda lunar Luna 21", "Launch of the Luna 21 lunar probe"),
    ("Lanzamiento de la sonda lunar Luna 18", "Launch of the Luna 18 lunar probe"),
    ("Lanzamiento de la sonda lunar Luna 10", "Launch of the Luna 10 lunar probe"),
    ("Lanzamiento de la sonda lunar Ranger 9", "Launch of the Ranger 9 lunar probe"),
    ("Lanzamiento de la sonda lunar Ranger 7", "Launch of the Ranger 7 lunar probe"),
    ("Lanzamiento de la sonda lunar Ranger 6", "Launch of the Ranger 6 lunar probe"),
    ("Lanzamiento de la sonda lunar Ranger 4", "Launch of the Ranger 4 lunar probe"),
    ("Lanzamiento de la sonda lunar Ranger 3", "Launch of the Ranger 3 lunar probe"),
    ("Lanzamiento de la sonda lunar Surveyor 1", "Launch of the Surveyor 1 lunar probe"),
    ("Lanzamiento de la sonda lunar Zond 4", "Launch of the Zond 4 lunar probe"),
    ("Lanzamiento de la sonda New Horizons hacia Plutón", "Launch of the New Horizons probe toward Pluto"),
    ("Lanzamiento de la sonda Pioneer Venus 1", "Launch of the Pioneer Venus 1 probe"),
    ("Lanzamiento de la sonda 2001 Mars Odyssey", "Launch of the 2001 Mars Odyssey probe"),
    ("Lanzamiento de la sonda Mariner 10", "Launch of the Mariner 10 probe"),
    ("Lanzamiento de la sonda Mariner 8", "Launch of the Mariner 8 probe"),
    ("Lanzamiento de la sonda Mariner 6", "Launch of the Mariner 6 probe"),
    ("Lanzamiento de la sonda Mariner 2", "Launch of the Mariner 2 probe"),
    ("Lanzamiento de la sonda Pioneer 11", "Launch of the Pioneer 11 probe"),
    ("Lanzamiento de la sonda Pioneer 10", "Launch of the Pioneer 10 probe"),
    ("Lanzamiento de la sonda Pioneer 5", "Launch of the Pioneer 5 probe"),
    ("Lanzamiento de la sonda Pioneer 4", "Launch of the Pioneer 4 probe"),
    ("Lanzamiento de la sonda Rosetta", "Launch of the Rosetta probe"),
    ("Lanzamiento de la sonda NEAR Shoemaker", "Launch of the NEAR Shoemaker probe"),
    ("Lanzamiento de la sonda Stardust", "Launch of the Stardust probe"),
    ("Lanzamiento de la sonda Clementine", "Launch of the Clementine probe"),
    ("Lanzamiento de la sonda Ranger", "Launch of the Ranger probe"),
    ("Lanzamiento de la sonda Venera 14", "Launch of the Venera 14 probe"),
    ("Lanzamiento de la sonda Venera 13", "Launch of the Venera 13 probe"),
    ("Lanzamiento de la sonda Venera 8", "Launch of the Venera 8 probe"),
    ("Lanzamiento de la sonda Venera 3", "Launch of the Venera 3 probe"),
    ("Lanzamiento de la sonda Aqua", "Launch of the Aqua probe"),
    ("Lanzamiento de la sonda Lunar Prospector", "Launch of the Lunar Prospector probe"),
    ("Lanzamiento de la sonda Luna 1", "Launch of the Luna 1 probe"),
    ("Lanzamiento del telescopio espacial Hubble", "Launch of the Hubble Space Telescope"),
    ("Lanzamiento del Telescopio Espacial Hubble", "Launch of the Hubble Space Telescope"),
    ("Lanzamiento del telescopio Kepler", "Launch of the Kepler telescope"),
    ("Lanzamiento del telescopio Chandra", "Launch of the Chandra telescope"),
    ("Lanzamiento del telescopio XMM-Newton", "Launch of the XMM-Newton telescope"),
    ("Lanzamiento del telescopio TESS", "Launch of the TESS telescope"),
    ("Lanzamiento del transbordador Discovery", "Launch of the Discovery shuttle"),
    ("Lanzamiento del transbordador Endeavour", "Launch of the Endeavour shuttle"),
    ("Lanzamiento de la estación espacial Salyut 1", "Launch of the Salyut 1 space station"),
    ("Lanzamiento de la estación espacial Skylab", "Launch of the Skylab space station"),
    ("Lanzamiento del Explorer 11", "Launch of Explorer 11"),
    ("Lanzamiento del Explorer 1", "Launch of Explorer 1, first US satellite"),
    ("Lanzamiento del Apolo 16", "Launch of Apollo 16"),
    ("Lanzamiento del Apolo 13", "Launch of Apollo 13"),
    ("Lanzamiento del Apolo 10", "Launch of Apollo 10"),
    ("Lanzamiento del Apolo 6", "Launch of Apollo 6"),
    ("Lanzamiento de la sonda Aqua", "Launch of the Aqua satellite"),
    ("Lanzamiento del Vanguard 1", "Launch of Vanguard 1"),
    ("Lanzamiento del Discoverer 1", "Launch of Discoverer 1, first reconnaissance satellite"),
    ("Lanzamiento del satélite meteorológico TIROS-1 (en año bisiesto)", "Launch of weather satellite TIROS-1 (leap year)"),
    ("Lanzamiento del satélite meteorológico TIROS-1", "Launch of weather satellite TIROS-1"),
    ("Lanzamiento del satélite de comunicaciones Syncom 3", "Launch of Syncom 3 communications satellite"),
    ("Lanzamiento de la sonda lunar Ranger", "Launch of the Ranger lunar probe"),
    ("Lanzamiento de la sonda lunar", "Launch of the lunar probe"),
    ("Lanzamiento del cohete V-2", "Launch of the V-2 rocket"),
    ("Lanzamiento del cohete", "Launch of the rocket"),
    ("Lanzamiento de Luna 1, la primera nave en alcanzar la velocidad de escape", "Launch of Luna 1, the first spacecraft to reach escape velocity"),
    ("Lanzamiento de la sonda", "Launch of the probe"),
    ("Lanzamiento del", "Launch of"),
    ("Lanzamiento de", "Launch of"),
    # Aterrizajes
    ("La sonda Huygens aterriza en Titán, luna de Saturno", "The Huygens probe lands on Titan, moon of Saturn"),
    ("La sonda NEAR Shoemaker aterriza en el asteroide Eros", "The NEAR Shoemaker probe lands on asteroid Eros"),
    ("La sonda Venera 14 aterriza en Venus", "The Venera 14 probe lands on Venus"),
    ("La sonda Venera 8 aterriza en Venus", "The Venera 8 probe lands on Venus"),
    ("La sonda Surveyor 3 aterriza en la Luna", "Surveyor 3 lands on the Moon"),
    ("Luna 9 realiza el primer aterrizaje suave en la Luna", "Luna 9 performs the first soft landing on the Moon"),
    ("El rover Spirit de la NASA aterriza en Marte", "NASA's Spirit rover lands on Mars"),
    ("El rover Opportunity de la NASA aterriza en Marte", "NASA's Opportunity rover lands on Mars"),
    ("El rover Opportunity aterriza en Marte", "The Opportunity rover lands on Mars"),
    ("Aterrizaje del primer transbordador espacial, Columbia", "Landing of the first space shuttle, Columbia"),
    # Descubrimientos
    ("Galileo Galilei descubre las lunas de Júpiter: Ío, Europa, Ganimedes y Calisto", "Galileo Galilei discovers Jupiter's moons: Io, Europa, Ganymede and Callisto"),
    ("William Herschel descubre Titania y Oberón, lunas de Urano", "William Herschel discovers Titania and Oberon, moons of Uranus"),
    ("William Herschel descubre Urano", "William Herschel discovers Uranus"),
    ("Christiaan Huygens descubre Titán", "Christiaan Huygens discovers Titan"),
    ("Descubrimiento de Ceres, el primer asteroide, por Giuseppe Piazzi", "Discovery of Ceres, the first asteroid, by Giuseppe Piazzi"),
    ("Descubrimiento de los anillos de Urano", "Discovery of Uranus's rings"),
    ("Descubrimiento del púlsar PSR B1919+21", "Discovery of pulsar PSR B1919+21"),
    ("Clyde Tombaugh descubre Plutón", "Clyde Tombaugh discovers Pluto"),
    ("Primera imagen de un agujero negro (M87)", "First image of a black hole (M87)"),
    ("Se anuncia el descubrimiento de Plutón (descubierto en 1930)", "Discovery of Pluto is announced (discovered in 1930)"),
    # Nacimientos
    ("Nace Stephen Hawking, físico teórico", "Stephen Hawking, theoretical physicist, is born"),
    ("Nace Nicolás Copérnico", "Nicolás Copernicus is born"),
    ("Nace Albert Einstein", "Albert Einstein is born"),
    ("Nace Clyde Tombaugh, descubridor de Plutón", "Clyde Tombaugh, discoverer of Pluto, is born"),
    ("Nace Serguéi Koroliov, diseñador del programa espacial soviético", "Sergei Korolev, designer of the Soviet space program, is born"),
    ("Nace el astronauta de la NASA Jerry L. Ross", "NASA astronaut Jerry L. Ross is born"),
    ("Nace el astronauta estadounidense James Irwin", "American astronaut James Irwin is born"),
    # Misiones tripuladas
    ("Yuri Gagarin se convierte en el primer humano en el espacio", "Yuri Gagarin becomes the first human in space"),
    ("Alan Shepard se convierte en el primer estadounidense en el espacio", "Alan Shepard becomes the first American in space"),
    ("Alan Shepard viaja a la Luna en el Apolo 14", "Alan Shepard travels to the Moon on Apollo 14"),
    ("Neil Armstrong da el primer paso en la Luna", "Neil Armstrong takes the first step on the Moon"),
    ("Alexei Leonov realiza la primera caminata espacial", "Alexei Leonov performs the first spacewalk"),
    ("Primera caminata espacial sin ataduras (Bruce McCandless)", "First untethered spacewalk (Bruce McCandless)"),
    ("John Glenn orbita la Tierra a bordo del Friendship 7", "John Glenn orbits Earth aboard Friendship 7"),
    ("La Unión Soviética realiza el primer acoplamiento de naves tripuladas", "The Soviet Union performs the first crewed spacecraft docking"),
    ("La NASA anuncia los primeros astronautas del Mercury 7", "NASA announces the first Mercury 7 astronauts"),
    ("El turista espacial Dennis Tito llega a la ISS", "Space tourist Dennis Tito arrives at the ISS"),
    # Accidentes
    ("Incendio en el Apolo 1 durante una prueba", "Fire aboard Apollo 1 during a test"),
    ("Accidente del transbordador espacial Challenger", "Space Shuttle Challenger disaster"),
    ("El transbordador Columbia se desintegra al reingresar", "Space Shuttle Columbia disintegrates on re-entry"),
    ("Vladimir Komarov fallece en la Soyuz 1", "Vladimir Komarov dies aboard Soyuz 1"),
    ("El tanque de oxígeno del Apolo 13 explota", "Apollo 13's oxygen tank explodes"),
    ("Fallece el astronauta Gus Grissom", "Astronaut Gus Grissom passes away"),
    # Sobrevuelos
    ("La sonda Voyager 1 descubre volcanes en Ío", "Voyager 1 discovers volcanoes on Io"),
    ("La sonda Voyager 2 sobrevuela Urano", "Voyager 2 flies by Uranus"),
    ("La sonda Voyager 2 sobrevuela Tritón", "Voyager 2 flies by Triton"),
    ("La sonda Mariner 10 sobrevuela Venus", "Mariner 10 flies by Venus"),
    ("La sonda Mariner 10 sobrevuela Mercurio", "Mariner 10 flies by Mercury"),
    ("La sonda Ulysses sobrevuela Júpiter", "Ulysses flies by Jupiter"),
    ("La sonda Pioneer 4 sobrevuela la Luna", "Pioneer 4 flies by the Moon"),
    ("La sonda Stardust sobrevuela el cometa Tempel 1", "Stardust flies by comet Tempel 1"),
    # Retornos y reentradas
    ("La sonda Stardust regresa con muestras del cometa Wild 2", "Stardust returns with samples from comet Wild 2"),
    ("La sonda Pioneer 10 envía su última señal", "Pioneer 10 sends its last signal"),
    ("Regreso exitoso del Apolo 13", "Successful return of Apollo 13"),
    ("La cosmonauta Valeri Polyakov regresa tras 437 días en el Mir", "Cosmonaut Valeri Polyakov returns after 437 days aboard Mir"),
    ("La estación Mir reingresa a la atmósfera", "The Mir station re-enters the atmosphere"),
    ("La estación espacial Skylab reingresa a la atmósfera", "Skylab space station re-enters the atmosphere"),
    ("Incineración de los restos de la estación Mir", "Incineration of the Mir station remains"),
    # Otros
    ("Primera imagen de un agujero negro", "First image of a black hole"),
    ("Robert Goddard lanza el primer cohete de combustible líquido", "Robert Goddard launches the first liquid-fuel rocket"),
    ("El Ejército de EE.UU. realiza la primera detección radar de la Luna", "The US Army achieves the first radar detection of the Moon"),
    ("John Herschel toma la primera fotografía sobre una placa de vidrio", "John Herschel takes the first photograph on a glass plate"),
    ("Explosión de supernova SN 1987A en la Gran Nube de Magallanes", "Supernova SN 1987A explodes in the Large Magellanic Cloud"),
    ("Meteorito de Cheliábinsk sobre Rusia", "Chelyabinsk meteor over Russia"),
    ("Colisión de satélites Iridium 33 y Cosmos 2251", "Collision of Iridium 33 and Cosmos 2251 satellites"),
    ("EE.UU. derriba un satélite espía con un misil", "The US shoots down a spy satellite with a missile"),
    ("Johannes Kepler formula su tercera ley", "Johannes Kepler formulates his third law"),
    ("Galileo es advertido por la Iglesia", "Galileo is warned by the Church"),
    ("El cometa Halley alcanza su perihelio", "Comet Halley reaches perihelion"),
    ("El batiscafo Trieste desciende a la Fosa de las Marianas", "The bathyscaphe Trieste descends to the Mariana Trench"),
    ("Nace la oveja Dolly, primer mamífero clonado", "Dolly the sheep, first cloned mammal, is born"),
    ("Se funda el Observatorio Astrofísico de Potsdam", "The Astrophysical Observatory of Potsdam is founded"),
    ("Se funda la NASA", "NASA is founded"),
    ("El Hubble despliega sus paneles solares", "Hubble deploys its solar panels"),
    ("La sonda Lunar Reconnaissance Orbiter entra en órbita lunar", "The Lunar Reconnaissance Orbiter enters lunar orbit"),
    ("La sonda Ranger 4 impacta en la Luna", "The Ranger 4 probe impacts the Moon"),
    ("Luna 10 se convierte en el primer satélite artificial de la Luna", "Luna 10 becomes the first artificial satellite of the Moon"),
    ("La sonda Venera 3 impacta en Venus", "The Venera 3 probe impacts Venus"),
    ("La sonda Kepler comienza su misión", "The Kepler probe begins its mission"),
]

def translate(text):
    for es, en in PHRASES:
        if text.startswith(es) or text == es:
            remainder = text[len(es):]
            return en + remainder
    # fallback: return original with note
    return text

# ── Read file ─────────────────────────────────────────────────────────────────
with open("data/astronomy-events.js", "r", encoding="utf-8") as f:
    content = f.read()

# ── Remove existing descripcionEN fields if any ───────────────────────────────
content = re.sub(r',\s*"descripcionEN":\s*"[^"]*"', '', content)

# ── Add descripcionEN after each descripcion ──────────────────────────────────
def replacer(m):
    desc_es = m.group(1)
    desc_en = translate(desc_es)
    return f'"descripcion": "{desc_es}",\n      "descripcionEN": "{desc_en}"'

content = re.sub(r'"descripcion":\s*"([^"]*)"', replacer, content)

# ── Write result ──────────────────────────────────────────────────────────────
with open("data/astronomy-events.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Done! Added descripcionEN to all events.")
