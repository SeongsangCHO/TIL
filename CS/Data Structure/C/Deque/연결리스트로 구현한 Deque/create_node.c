/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:01:15 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 19:45:22 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

t_node		*create_node(int data)
{
	t_node *new;

	if(!(new = malloc(sizeof(t_node))))
		return (NULL);
	new->data = data;
	new->prev = NULL;
	new->next = NULL;
	return (new);
}
