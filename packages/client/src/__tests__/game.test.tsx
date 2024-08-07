import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GamePage } from '../pages/game';
import { Base2D } from '../pages/game/HamsterCanvas/core/Base2D';
import { Game } from '../pages/game/HamsterCanvas/Game';

configure({ adapter: new Adapter() });

describe('Game test', () => {
  const mockStore = configureStore();

  it('Проверяем состояние начала игры', () => {
    const initialState = { gameState: { status: 'new' } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    expect(screen.getByText('Начать игру')).toBeDefined();
  });

  const canvas = document.createElement('canvas');

  canvas.id = 'canvas';
  canvas.width = 400;
  canvas.height = 400;

  it('Проверяем установку канваса', () => {
    const game = new Game(
      canvas,
      () => {},
      () => {}
    );

    game.startGame();

    expect(game.canvas).not.toBeNull();
  });

  it('Проверяем неверное нажатие клавиши', (done) => {
    const game = new Game(
      canvas,
      () => {},
      () => {}
    );

    game.startGame();

    const pressEvent = new KeyboardEvent('keydown', { code: 'KeyZ' }); // имитируем нажатие клавиши, которой нет в списке разрешенных

    game.keyUp(pressEvent);

    setTimeout(() => {
      const isBreak = game.heart.at(-1)?.break; // статус последней жизни (при неверном нажатии - true)

      expect(isBreak).toBeTruthy();
      game.stopGame();
      done();
    }, 1000);
  });

  it('Проверяем правильное нажатие клавиши', (done) => {
    const game = new Game(
      canvas,
      () => {},
      () => {}
    );

    game.startGame();

    const pressEvent = new KeyboardEvent('keydown', {
      code: `Key${game.chars[0].char}`,
    });

    game.keyUp(pressEvent);

    setTimeout(() => {
      const isBreak = game.heart.at(-1)?.break; // статус последней жизни (при верном нажатии - false)

      expect(isBreak).toBeFalsy();
      game.stopGame();
      done();
    }, 1000);
  });

  class testCircle extends Base2D {
    draw() {
      // отрисовка тестового круга
      if (this.context) {
        this.context.beginPath();
        this.context.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.stroke();
      }
    }
  }

  it('Проверяем Show setter абстрактного класса Base2D', () => {
    const canvas = document.createElement('canvas');

    const testElem = new testCircle(canvas, {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    testElem.show = false;

    expect(testElem.show).toBeFalsy();
  });

  it('Проверяем метод setPosition() абстрактного класса Base2D', () => {
    const canvas = document.createElement('canvas');

    const testElem = new testCircle(canvas, {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    const newPos = 10;

    testElem.setPosition(newPos, 0);

    expect(testElem.x).toBe(newPos);
  });
});
