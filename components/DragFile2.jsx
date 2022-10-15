import { useState } from 'react'
import { useEffect } from 'react'
import styles from '../styles/Drag.module.css'
import CryptoJS from 'crypto-js'

export default function DragFile() {

    const [text, setText] = useState()
    const [textAES, setTextAES] = useState()

    function val() {
    }

    function descifrarAES() {
        let txt = document.querySelector('#text').value
        let clave = document.querySelector('#llave').value
        let descifra = CryptoJS.AES.decrypt(txt, clave).toString(CryptoJS.enc.Utf8);
        document.querySelector('#descifra').value = descifra
        descargarArchivo(generarTexto(descifra), 'TextoDesifrado' + Math.random() + '.txt');

        function descargarArchivo(contBlob, nombreArchivo) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                save.download = nombreArchivo;
                var clicEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                save.dispatchEvent(clicEvent);

                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            };
            reader.readAsDataURL(contBlob);
            alert("Se descargara el archivo, okay?");
        };
        function generarTexto(datos) {
            let texto = [];
            texto.push(datos);
            return new Blob(texto, {
                type: 'text/plain'
            })
        }
    }
    return (
        <>
            <h1>Desifrador AES</h1>
            <h2>By: Ruiz Ponzio Diego</h2>
            <h2>{'      '}Rosales Barraza Erick</h2>
            <br />
            <br />

            <br />
            <div className={styles.preview}>
                <form id='form' method="POST"> 
                <input type='text' id='text' name='text' placeholder='Ingresa el texto cifrado'/>
                <input type='text'id='llave' name='llave' placeholder='Ingrese la llave' />
                <br />
                <textarea id='descifra' name='descifra' readOnly></textarea>
                <br />
                <button className={styles.button} onClick={descifrarAES}>Desifrar</button>
                </form>
            </div>
        </>
    )
}