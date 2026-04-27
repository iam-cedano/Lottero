INSERT INTO casinos (name, alias, url, status) VALUES
('onewin', '1Win', 'https://onewin.com', true),
('onexbet', '1xBet', 'https://1xbet.com', true);

INSERT INTO games (name, alias, status) VALUES
('aviator', 'Aviator', true),
('jetx', 'Jetx', true),
('plinko', 'Plinko', true),
('mines', 'Mines', true),
('dice', 'Dice', true),
('crash', 'Crash', true),
('cosmic-cash', 'Cosmic Cash', true);

INSERT INTO groups(casino_id, game_id, strategy, strategy_alias, status) VALUES 
(1, 1, 'simple_strategy', 'Simple Strategy', true),
(1, 1, 'securest_strategy', 'Securest Strategy', true);

INSERT INTO channels (language, chat_id, status) VALUES 
('es', 'bot_de_aviator', true),
('en', 'best_avitor_predictor', true),
('es', 'senales_de_aviator', true);

INSERT INTO channels_groups(channel_id, group_id) VALUES
(1, 1),
(2, 2);

INSERT INTO templates(channel_id, group_id, name, language, content) VALUES
(1, 1, 'bet', 'en', '✅ SIGNAL CONFIRMED! 🚀\n\n🎯 ENTER NOW!\n💰 Bet: After {last_score}x\n🎯 Exit: Cash out at {target}x!\n\n⚠️ MAXIMUM {martingales} MARTINGALES\n🔥 STAY DISCIPLINED!'),
(1, 1, 'wait', 'en', '🚨 ATTENTION! SIGNAL PREPARING 🚨\n\n⏰ Entry opportunity approaching...\n🔍 Waiting for confirmation...\n\n🎮 REGISTER NOW:\n🔗 <a href="https://1wfafs.life/v3/aviator-fire?p=4yz3">https://1wfafs.life/v3/aviator-fire?p=4yz3</a>'),
(1, 1, 'cancel', 'en', '❌ SIGNAL CANCELLED\n\n🔄 Analysis continuing...\n⏳ Waiting for new signal...\n💡 Be patient, opportunity will come!'),
(1, 1, 'win', 'en', '🎉 YOU WON! 💰\n\n🎯 Result: 2.00x\n✅ Target: 1.50x SUCCESS!\n\n📊 DAILY STATISTICS:\n━━━━━━━━━━━━━━━━━━━━\n✅ Wins: 1\n❌ Losses: 0\n━━━━━━━━━━━━━━━━━━━━\n💎 Success Rate: 100.00%\n\n🎰 PLAY AVIATOR: <a href="https://1wfafs.life/v3/aviator-fire?p=4yz3">here</a>'),
(1, 1, 'lose', 'en', '❌ LOSS\n\n😔 Not this time...\n💪 Wait for the next signal!\n🎯 Patience and discipline win.');

INSERT INTO templates(channel_id, group_id, name, language, content) VALUES
(1, 1, 'bet', 'es', '✅ ¡SEÑAL CONFIRMADA! 🚀\n\n🎯 ¡ENTRA AHORA!\n💰 Apuesta: Después de {last_score}x\n🎯 Salida: ¡Retira en {target}x!\n\n⚠️ MÁXIMO {martingales} MARTINGALAS\n🔥 ¡MANTÉN LA DISCIPLINA!'),
(1, 1, 'wait', 'es', '🚨 ¡ATENCIÓN! PREPARANDO SEÑAL 🚨\n\n⏰ Oportunidad de entrada acercándose...\n🔍 Esperando confirmación...\n\n🎮 REGÍSTRATE AHORA:\n🔗 <a href="https://1wfafs.life/v3/aviator-fire?p=4yz3">https://1wfafs.life/v3/aviator-fire?p=4yz3</a>'),
(1, 1, 'cancel', 'es', '❌ SEÑAL CANCELADA\n\n🔄 El análisis continúa...\n⏳ Esperando nueva señal...\n💡 ¡Ten paciencia, la oportunidad llegará!'),
(1, 1, 'win', 'es', '🎉 ¡GANASTE! 💰\n\n🎯 Resultado: 2.00x\n✅ Objetivo: 1.50x ¡ÉXITO!\n\n📊 ESTADÍSTICAS DIARIAS:\n━━━━━━━━━━━━━━━━━━━━\n✅ Ganancias: 1\n❌ Pérdidas: 0\n━━━━━━━━━━━━━━━━━━━━\n💎 Tasa de Éxito: 100.00%\n\n🎰 JUEGA AVIATOR: <a href="https://1wfafs.life/v3/aviator-fire?p=4yz3">aquí</a>'),
(1, 1, 'lose', 'es', '❌ PÉRDIDA\n\n😔 Esta vez no...\n💪 ¡Espera a la siguiente señal!\n🎯 La paciencia y la disciplina ganan.');