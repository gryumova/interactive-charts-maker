# interactive-charts-maker
Creating interactive charts

## Overview
The user can set chart settings in the edit tab. The editor is based on the Monaco Editor library. The configuration format can be found in readme/example.xml.

```
<layout> 
  <name>engine_app/test.dsh</name>
  <panel>
      <x>1</x>
      <y>1</y>
      <bar_spacing>5</bar_spacing>
      <min_bar_spacing>0.5</min_bar_spacing>
      <chart>
        <symbol>BTCUSDT</symbol>
        <color>blue</color>
        <type>addLineSeries</type>
        <settings>
          <priceScaleId>left</priceScaleId>
          <visible>true</visible>
          <lineStyle>0</lineStyle>
          <lineWidth>1</lineWidth>
          <precision>4</precision>
        </settings>
      </chart>
    </panel>
</layout>
```

The preview tab displays the graphs constructed using the Lightweight Charts library.

![](/readme/screen.gif)

## Run code
Install Monaco Editor and Lightweight Charts:
```
npm install monaco-editor
npm install lightweight-charts
```

Also you need to apply: 
```
npm install --save react-toastify
```

Run code:
```
npm start
```
