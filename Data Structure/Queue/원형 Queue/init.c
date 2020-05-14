/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/27 15:35:44 by secho             #+#    #+#             */
/*   Updated: 2020/04/27 15:53:33 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

t_queue *init(void)
{
	t_queue *queue;

	if(!(queue = malloc(sizeof(t_queue))))
		return (NULL);
	queue->rear = -1;
	queue->front = -1;
	queue->max_size = 100;
	if(!(queue->data = malloc(sizeof(int) * queue->max_size)))
		return (NULL);
	return (queue);
}
