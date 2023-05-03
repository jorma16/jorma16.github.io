# UOC - Visualización de Datos PEC2
**Alumno:** Jorge Marchán Gutiérrez

## Ejercicio 1 - Circle Packing
[Aquí](https://jorma16.github.io/circle_packing.html) tenéis colgada la primera representación de todas.
### Técnica de representación
Se trata de una visualización jerárquica de subconjuntos, el área de cada subconjunto se representa como un círculo, el objetivo es comprender mejor las diferencias entre los diferentes subconjuntos, visualmente hablando.

En el ejemplo, se muestra el número de habitantes por pais y por continente, en este caso, los colores muestran los continentes y cada circulo representa un país, el área del circulo determina el número de habitantes que tiene, a mayor número de habitantes, mayor radio de circunferencia.

Podemos representar datos cuantitativos con esta técnica.

## Ejercicio 2 - Gauge
[Aquí](https://jorma16.github.io/gauge.html) tenéis colgada esta representación
### Técnica de representación
Se trata de una de las herramientas más usadas para representar valores progresivos.

Es un gráfico muy sencillo que puede aplicarse en todo tipo de escenarios, por ejemplo cuanod tenemos un rango lineal de información progresiva y necesitamos representar sus variaciones o cuando queremos representar el estado actual en la consecución de un objetivo determinado.

En el ejemplo se muestra un valor porcentual que va de 0 a 100, distribuido en tres rangos, podemos interpretar que el 100% sería la consecución de un objetivo, por ejemplo de ventas, con este simple gráfico veriamos la situación en la que nos encontramos actualmente.

Nos sirve para representar datos cuantitativos dentro de un rango. En este caso solo necesitamos tener el valor minimo, el máximo y el actual, para poder representar este gráfico, si tenemos intervalos también los necesitaremos.
## Ejercicio 3 - Bump Chart
[Aquí](https://jorma16.github.io/bump_chart.html) tenéis colgada esta representación

### Técnica de representación
El Bump Chart es un tipo de gráfico utilizado para explorar los cambios en el rango de un valor en una dimension de tiempo.

Para ello, los datos deben de disponer de timestamps y estar agrupados en función del número de etiquetas temporales que necesitemos, en nuestro caso, por decadas. Además en este tipo de gráficos suele ser necesario una segunda dimension que serian cada una de las "filas" que tenemos en el gráfico. Con este tipo de visualización podemos de un simple vistazo observar como ha ido cambiando la progresion de los distintos actores entre si, en el intervalo de tiempo con el que trabajamos en nuestro dataset.
